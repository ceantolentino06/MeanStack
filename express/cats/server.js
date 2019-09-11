const express = require("express");
const app = express();
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.get('/cats', (request, response) => {
    all_cats = [
        { 'name': 'Cuddles', 'fav_food': 'Spaghetti', 'age': 3, 'sleeping_spots': ['Under the bed', 'In a sunbeam'], 'pic': 'cat1.jpg' },
        { 'name': 'Howard', 'fav_food': 'Fried Rice', 'age': 69, 'sleeping_spots': ['Cardboard Box', 'Kitchen'], 'pic': 'cat2.jpg' },
        { 'name': 'Carl', 'fav_food': 'Spinach', 'age': 7, 'sleeping_spots': ['Window', 'Toilet'], 'pic': 'cat4.jpg' },
    ]
    response.render('index', { cats: all_cats });
});

app.get('/Howard', (request, response) => {
    response.render('howard', { howard: { 'name': 'Howard', 'fav_food': 'Fried Rice', 'age': 69, 'sleeping_spots': ['Cardboard Box', 'Kitchen'], 'pic': 'cat2.jpg' } });
});

app.listen(8000, () => console.log("listening on port 8000"));