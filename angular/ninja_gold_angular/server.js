const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const uniqueValidator = require('mongoose-unique-validator');

app.use(express.static( __dirname + '/public/dist/public'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/ninjagold', { useNewUrlParser: true });

const NinjaSchema = new mongoose.Schema({
    ninja_name: {type: String, required:[true, "Please put your ninja name!"], unique: [true, "This name is taken!"]},
    score: {type: Number, default: 0}
}, {timestamps: true});
NinjaSchema.plugin(uniqueValidator);

const Ninja = mongoose.model("Ninja", NinjaSchema)

app.get('/ninjas', (req,res)=>{
    Ninja.find()
        .then(data=>res.json(data))
        .catch(err=>res.json(err))
})

app.get('/ninjas/:ninja_name', (req,res)=>{
    Ninja.findOne({ninja_name: req.params.ninja_name})
        .then(data=>res.json(data))
        .catch(err=>res.json(err))
})

app.post('/ninjas', (req,res)=>{
    Ninja.create(req.body)
        .then(data=>res.json(data))
        .catch(err=>res.json(err))
})

app.listen(8000, () => console.log("listening on port 8000"));

