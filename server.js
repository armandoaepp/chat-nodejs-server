let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

var port = process.env.PORT || '3000';

io.on('connection',(socket)=>{

    console.log('new connection made.');


    socket.on('join', function(data){
       socket.broadcast.emit('new user joined', {user:data.user, message:'has joined this room.'});

    });

    socket.on('message',function(data){

      io.emit('new message', {user:data.user, message:data.message});
    })

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });


});

// Initialize our websocket server on port 5000
http.listen(port, () => {
    console.log(`started on port http://localhost:${port}`);
});