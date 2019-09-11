const express = require("express");
const app = express();

app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const session = require('express-session');
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
const server = app.listen(8000, () => console.log("listening on port 8000"));
const io = require('socket.io')(server);
var counter = 0;
io.on('connection', function(socket) { //2
    counter++;
    socket.emit('server_counter', { counter: counter }); //3
    socket.on('client_counter', function(data) { //7
        console.log(data.counter); //8 (note: this log will be on your server's terminal)
    });

});

app.get('/', (request, response) => {

    response.render('index', { times: request.session.times });
});



app.get('/reset', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});