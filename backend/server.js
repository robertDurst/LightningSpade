var LightningUtils = require('./utils/LightningNetworkUtils');
var io = require('socket.io')(3001);

io.on('connection', function (socket) {
  console.log("New connection.");

  socket.on('CONNECT', function (data) {
    LightningUtils.getInfo((response) =>{
      if(response){
        socket.emit("CONNECT_SUCCESS", response);
      } else {
        socket.emit("CONNECT_FAILURE");
      }
    })
  });

});
