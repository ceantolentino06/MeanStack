const express = require("express");
const app = express();

app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (request, response) => {
    response.render('index');
});
const server = app.listen(8000, () => console.log("listening on port 8000"));

app.use(express.static(__dirname + "/public"));
const io = require('socket.io')(server);
var counter = 0;

io.on('connection', function(socket) { //2


    function send_emit(num) {
        io.emit('server_counter', { counter: num });
    }
    send_emit(counter);
    //3
    socket.on('client_counter', function() { //7
        counter++;
        send_emit(counter) //8 (note: this log will be on your server's terminal)
    });

    socket.on('client_reset', function() {
        counter = 0;
        send_emit(counter);
    });



});