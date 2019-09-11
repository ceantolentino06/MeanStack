const express = require("express");
const app = express();
const mongoose = require('mongoose');
const body_parser = require('body-parser')
const flash = require('express-flash');

app.use(flash());
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true }));
const session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

mongoose.connect('mongodb://localhost/animalsdb', { useNewUrlParser: true });

const AnimalSchema = new mongoose.Schema({
    name: { type: String, required: [true, "This field cannot be empty"], minlength: [2, "Must 2 characters long"] },
    animal: { type: String, required: [true, "This field cannot be empty"], minlength: [2, "Must be 2 characters long"] }
}, { timestamps: true });


const Animal = mongoose.model('Animal', AnimalSchema);

app.get('/', (request, response) => {
    Animal.find()
        .then(animals => {
            response.render("index", { animals: animals });
        })
        .catch(err => res.json(err));
});

app.get('/new', (request, response) => {
    response.render("new");
});

app.post('/new', (req, res) => {
    const animal = new Animal(req.body);
    animal.save()
        .then(() => res.redirect('/'))
        .catch(err => {
            // adjust the code below as needed to create a flash message with the tag and content you would like
            for (var key in err.errors) {
                req.flash(key, err.errors[key].message);
            }
            res.redirect('/new');
        });
})

app.get('/:id', (req, res) => {
    Animal.findOne({ _id: req.params.id })
        .then(animal => {
            // logic with single user object result
            console.log(animal)
            res.render("show", { animal: animal })
        })
        .catch(err => res.json(err));
})

app.post('/destroy/:id', (req, res) => {
    Animal.remove({ _id: req.params.id })
        .then(() => res.redirect('/'))
        .catch(err => res.json(err));
})

app.get('/edit/:id', (req, res) => {
    Animal.findOne({ _id: req.params.id })
        .then(animal => {
            // logic with single user object result
            console.log(animal)
            res.render("edit", { animal: animal })
        })
        .catch(err => res.json(err));
})

app.post('/process/:id', (req, res) => {
    Animal.findOne({ _id: req.params.id })
        .then(animal => {
            // logic with single user object result
            animal.name = req.body.name;
            animal.animal = req.body.animal;
            animal.save()
                .then(() => res.redirect('/'))
                .catch(err => {
                    // adjust the code below as needed to create a flash message with the tag and content you would like
                    for (var key in err.errors) {
                        req.flash(key, err.errors[key].message);
                    }
                    res.redirect('/edit/'+req.params.id);
                })
        })
        .catch(err => res.json(err));
    });
    app.listen(8000, () => console.log("listening on port 8000"));