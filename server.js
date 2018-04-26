var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/', function(req, res, next) {
	res.sendFile(__dirname + '/public/index.html')
});

app.use(express.static('public'));


io.on('connection', function(client) {

	client.on('join', function(data) {
		console.log(data);
	});

	client.on('messages', function(data, name){
		client.emit('thread', data);
		client.broadcast.emit('thread', data);
		console.log(name);
	});
});

server.listen(7777);