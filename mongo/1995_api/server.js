const express = require("express");
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/usersdb', { useNewUrlParser: true });

const PeopleSchema = new mongoose.Schema({
    name: String
}, { timestamps: true })

const People = mongoose.model("People", PeopleSchema)

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    People.find()
        .then(data => res.json(data))
        .catch(err => res.json(err))
});
app.get('/new/:name', (req, res) => {
    const people = new People()
    people.name = req.params.name
    people.save()
        .then(data => res.json(data))
        .catch(err => res.json(err))
});
app.get('/remove/:name', (req, res) => {
    People.findOneAndDelete({ name: req.params.name })
        .then(data => res.json(data))
        .catch(err => res.json(err))
});

app.get('/:name', (req, res) => {
    People.findOne({ name: req.params.name })
        .then(data => res.json(data))
        .catch(err => res.json(err))
});
app.listen(8000, () => console.log("listening on port 8000"));