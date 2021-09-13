// make connection

var socket = io.connect('http://localhost:4000');



//query DOM

var message, handle, btn, output;

	message = document.getElementById('message');
	handle = document.getElementById('handle');
	btn = document.getElementById('send');
	output = document.getElementById('output');


	//emit events

	btn.addEventListener('click', function() {
		socket.emit('chat', {
			message: message.value,
			handle: handle.value
		});
	});


//listen for events
socket.on('chat', function(data) {
	console.log(data);

output.innerHTML += `<p><strong> ${data.handle} </strong> ${data.message} </p>`;


});
