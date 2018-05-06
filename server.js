var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database: 'chat'
});

app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/public/index.html')
});

app.use(express.static('public'));


io.on('connection', function(client) {

    client.on('messages', function(data,name){
        const newMessage = {name: name, message: data};
        connection.connect(function (err) {
            if (err) throw err;
            console.log("CONNECTED");
            connection.query('INSERT INTO messages SET ?',newMessage);
        });

        client.emit('thread', data, name);
        client.broadcast.emit('thread', data, name);
    });
});

server.listen(7777);