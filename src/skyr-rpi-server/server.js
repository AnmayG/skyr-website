const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const fs = require("fs");
const https = require("https");

// import LED control API
const { toggle } = require('./led-api.js');

// create an express app
const app = express();

var options = {
	key: fs.readFileSync("./file.pem"),
	cert: fs.readFileSync("./file.crt")
};
var serverPort = 9000
// var server2 = https.createServer(options, app);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

// server listens on `9000` port
const server = app.listen( 9000, () => console.log( 'Express server started!'));
// server2.listen(serverPort, () => console.log("Express HTTPS server running at port " + serverPort));

// create a WebSocket server
const io = socketIO(server);

// Python code executor
var process = null;
function runPythonCode(code) {
	if(process !== null) {
		killPythonCode();
	}
	var spawn = require('child_process').spawn;
	process   = spawn('python3', ['-c', code]);
	process.stdout.on('data', function(data) {
		console.log(data.toString());
		io.emit('program-output', {
			value: data.toString()
		});
	});
	
	process.stderr.on('data', (err) => {
		console.error(err.toString());
		io.emit('program-output', {
			value: err.toString()
		});
	});

	process.on('exit', () => {
		console.log('The python script has exited');
		io.emit('program-output', {
			value: "Script has stopped"
		});
	});
}

function killPythonCode() {
	// Kill the old process
	process.stdin.pause();
	process.kill();
	
	// Start a new one to clean up the board
	var spawn = require('child_process').spawn;
	process   = spawn('python3', ['./cleanup.py']);
	process.on('exit', () => {
		console.log("Cleanup finished");
	});
}

// listen for connection
io.on( 'connection', (client) => {
  console.log( 'SOCKET: ', 'A client connected', client.id );
  io.emit('message', 'This is a message from the socket io server');

  // listen to `led-toggle` event
  client.on( 'led-toggle', ( data ) => {
    console.log('Received led-toggle event.');
    toggle(data.r, data.g, data.b); // toggle LED
  });

  client.on('python-push', (data) => {
	  runPythonCode(data.code); // run the received python code
  });

  client.on('python-kill', (data) => {
	  killPythonCode();
  });
});
