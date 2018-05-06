var socket = io.connect('http://localhost:7777');

socket.on('thread', function(data, name) {
    $('#thread').append('<li>'  + name + ": " + data + '</li>');
});

$('form').submit(function(){
    var message = $('#message').val();
    var name = $('#name').val();
    socket.emit('messages', message, name);
    this.reset();
    return false;
});