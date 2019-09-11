const express = require("express");
const app = express();

app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (request, response) => {
    response.render('index');
});
const server = app.listen(8000, () => console.log("listening on port 8000"));

const io = require('socket.io')(server);

io.on('connection', function(socket) { //2

    socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3
    socket.on('thankyou', function(data) { //7
        console.log(data.msg); //8 (note: this log will be on your server's terminal)
    });

});