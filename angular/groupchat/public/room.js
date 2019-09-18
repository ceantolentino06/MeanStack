$(document).ready(function() {
    var name = prompt("Please enter your name:")
    console.log(name)
    var socket = io();
    socket.emit('new_user', roomName, name); //1
    socket.on('get_all_messages', function(data) {
        console.log(data);
        for (var msg of data) {
            $('#messages').append(`<p class="m-0"><span class="text-success">${msg.sender}</span>: ${msg.msg}</p>`)
        }
        $('#messages').append(`<p class="m-0"><span class="text-secondary font-italic">Joined room.</p>`)
    })
    $('button').click(function() {
        socket.emit('got_new_message', roomName, {
            sender: name,
            msg: $('#message').val()
        })
        $('#messages').append(`<p class="m-0"><span class="text-info">You</span>: ${$('#message').val()}</p>`)
        $('#messages').animate({
            scrollTop: $('#messages').get(0).scrollHeight
        }, 1000);
        $('#message').val("");
    });
    socket.on('new_message', function(data) {
        $('#messages').append(`<p class="m-0"><span class="text-success">${data.sender}</span>: ${data.msg}</p>`)
    })
    socket.on('user_connected', function(name) {
        $('#messages').append(`<p class="m-0"><span class="text-secondary font-italic">${name} joined the room.</p>`)
    })
    socket.on('user_disconnected', function(name) {
        $('#messages').append(`<p class="m-0"><span class="text-secondary font-italic">${name} left the room.</p>`)
    })
})