// Create web server
var express = require('express');
var app = express();
var path = require('path');

// Create server
var server = app.listen(8080, function() {
    var port = server.address().port;
    console.log('Listening at http://localhost:%s', port);
});

// Make public folder available
app.use(express.static(path.join(__dirname, 'public')));

// Create socket server
var io = require('socket.io')(server);

// Listen for socket connections
io.on('connection', function(socket) {
    console.log('Client connected');

    // Listen for new comments
    socket.on('comment', function(comment) {
        console.log(comment);
        io.emit('comment', comment);
    });

    // Listen for new likes
    socket.on('like', function(like) {
        console.log(like);
        io.emit('like', like);
    });

    // Listen for new dislikes
    socket.on('dislike', function(dislike) {
        console.log(dislike);
        io.emit('dislike', dislike);
    });

    // Listen for disconnect
    socket.on('disconnect', function() {
        console.log('Client disconnected');
    });
});