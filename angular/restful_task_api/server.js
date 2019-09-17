const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(express.static( __dirname + '/public/dist/public'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/taskdb', { useNewUrlParser: true });

const TaskSchema = new mongoose.Schema({
    title: String,
    description: { type: String, default: "" },
    completed: { type: Boolean, default: false },
}, { timestamps: true })

const Task = mongoose.model("Task", TaskSchema)

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.get('/tasks', (req, res) => {
    Task.find()
        .then(data => res.json(data))
        .catch(err => res.json(err))
});

app.get('/tasks/:id', (req, res) => {
    Task.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.json(err))
})

app.post('/task', (req, res) => {
    console.log(req.body)
    Task.create(req.body)
        .then(data => res.json(data))
        .catch(err => res.json(err))
})

app.put('/tasks/:id', (req, res) => {
    Task.findByIdAndUpdate(req.params.id, req.body)
        .then(data => res.json(data))
        .catch(err => res.json(err))
})

app.delete('/tasks/:id', (req, res)=>{
    Task.findByIdAndDelete(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.json(err))
})

app.listen(8000, () => console.log("listening on port 8000"));