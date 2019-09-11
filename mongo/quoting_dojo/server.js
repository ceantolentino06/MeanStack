const express = require("express");
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const moment = require('moment');

app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(flash());
mongoose.connect('mongodb://localhost/quotesdb', { useNewUrlParser: true });

const QuoteSchema = new mongoose.Schema({
    quoted_by: { type: String, required: [true, "Name is required."] },
    quote: { type: String, required: [true, "Quote is required."], minlength: [10, "Quote should be at least 10 characters long."] }
}, { timestamps: true });

const Quote = mongoose.model('Quote', QuoteSchema);


app.get('/', (request, response) => {
    Quote.find()
        .then(quotes => {
            console.log(quotes)
        })
        .catch(err => res.json(err));
    response.render("index");
});

app.post('/quotes', (req, res) => {
    // ...create a new document to store in the User collection and save it to the DB.
    const quote = new Quote(req.body);
    quote.save()
        .then(() => res.redirect('/'))
        .catch(err => {
            // adjust the code below as needed to create a flash message with the tag and content you would like
            for (var key in err.errors) {
                console.log(key)
                req.flash(key, err.errors[key].message);
            }
            res.redirect('/');
        });
    // If there's an error and the record was not saved, this (err) will contain validation errors.
})

app.get('/quotes', (req, res) => {
    Quote.find().sort('-createdAt')
        .then(quotes => {
            res.render('quotes', {quotes: quotes, moment: moment})
        })
        .catch(err => res.json(err));
})


app.listen(8000, () => console.log("listening on port 8000"));