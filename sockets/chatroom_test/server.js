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
var users = []
io.on('connection', function(socket) { //2

    socket.on('got_a_new_user', function(data) { //7
        users.push(data);
        console.log(users); //8 (note: this log will be on your server's terminal)
        socket.emit('all_users', users);
        socket.broadcast.emit('new_user', data);
    });

});