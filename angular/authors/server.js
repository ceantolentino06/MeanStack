const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
app.use(express.static( __dirname + '/public/dist/public'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/authorsdb', { useNewUrlParser: true });

const AuthorSchema = new mongoose.Schema({
    name: {type:String, minlength: [3, "Name should be 3 characters long"]}
}, { timestamps: true })

const Author = mongoose.model("Author", AuthorSchema)

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.get('/authors', (req, res) => {
    Author.find()
        .then(data => res.json({"result": "Success", "data": data }))
        .catch(err => res.json({"result": "Failed", "data": err }))
});

app.get('/authors/:id', (req, res) => {
    Author.findById(req.params.id)
       .then(data => res.json({"result": "Success", "data": data }))
        .catch(err => res.json({"result": "Failed", "data": err }))
})

app.post('/author', (req, res) => {
    console.log(req.body)
    Author.create(req.body)
       .then(data => res.json({"result": "Success", "data": data }))
        .catch(err => res.json({"result": "Failed", "data": err }))
})

app.put('/authors/:id', (req, res) => {
    Author.findByIdAndUpdate(req.params.id, req.body, {runValidators:true})
       .then(data => res.json({"result": "Success", "data": data }))
        .catch(err => res.json({"result": "Failed", "data": err }))
})

app.delete('/authors/:id', (req, res)=>{
    Author.findByIdAndDelete(req.params.id)
       .then(data => res.json({"result": "Success", "data": data }))
        .catch(err => res.json({"result": "Failed", "data": err }))
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
  });
app.listen(8000, () => console.log("listening on port 8000"));