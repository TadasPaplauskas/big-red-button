var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('clicked', function(name) {
    console.log(name + ' clicked');

    var date = new Date();
    var time = date.toTimeString().split(' ')[0];

    io.emit('clicked', name + ' <small>(' + time + ')</small>');
  });

  socket.on('reset', function(){
    console.log('reset');
    io.emit('reset', true);
  });
});

http.listen(3003, function(){
  console.log('listening on *:3003');
});