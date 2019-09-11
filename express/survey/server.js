const express = require("express");
const app = express();

app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
    response.render('index');
});

app.post('/result', (req, res) => {
    res.render('result', { result: req.body });
});

const server = app.listen(8000, () => console.log("listening on port 8000"));

const io = require('socket.io')(server);

io.on('connection', function(socket) { //2
    var random_number = Math.floor((Math.random() * 1000) + 1); //3
    var postData;

    socket.on('posting_form', function(data) { //7
        postData = data.post;
        console.log(postData); //8 (note: this log will be on your server's terminal)
        socket.emit('random', {
            random_number: 'Your lucky number emitted by the server is ' + random_number,
            post: 'You emitted the following information to the server: ' + JSON.stringify(postData)
        });
    });

    console.log(postData)


});