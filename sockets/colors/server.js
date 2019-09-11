const express = require("express");
const app = express();

app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (request, response) => {
    response.render('index');
});
var server = app.listen(8000, () => console.log("listening on port 8000"));

const io = require('socket.io')(server);
var current_color = 'green';
io.on('connection', function(socket) { //2


    io.emit('current_color', current_color);
    socket.on('change_color', function(data) {
        current_color = data;
        io.emit('current_color', current_color);
    })

});