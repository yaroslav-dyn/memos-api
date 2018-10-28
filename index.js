var express = require('express');

var socket = require('socket.io');


//app setup
var app = express();
var server = app.listen(4000, function(){

	console.log('Listen');

});

//Static files
app.use(express.static('public'));


//socket setup
var io = socket(server);


io.on('connection', function(socket) {
	
	socket.on('chat', function(data) {

		io.sockets.emit('chat', data);
	});


});
