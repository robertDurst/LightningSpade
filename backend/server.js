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

  socket.on('GET_PEERS', function (data) {
    getPeers(socket);
  });

  socket.on('GET_WALLET', function (data){
    getWalletBalance(socket);
  })

  socket.on('OPEN_CHANNEL', function (peer) {
    console.log(peer.pub_key);
    const call = LightningUtils.openChannel(peer.pub_key, 1000000);

    call.on('data', function(message) {
      if(message.update === 'chan_pending') {
        socket.emit('PENDING_CHANNEL');
      } else if(message.update === 'chan_open'){
        console.log(message.chan_open.channel_point);
        socket.emit('OPEN_CHANNEL', message.chan_open.channel_point);
      }
    });
    call.on('end', function() {
        // The server has finished sending
        console.log("END");
      });
    call.on('status', function(status) {
      // Process status
      console.log("Current status: " + status);
    });
  });

  socket.on('CLOSE_CHANNEL', function (channel_point) {
    const call = LightningUtils.closeChannel(channel_point);

    call.on('data', function(message) {
      if(message.update === 'close_pending') {
        socket.emit('PENDING_CHANNEL');
      } else if(message.update === 'chan_close'){
        socket.emit('CLOSE_CHANNEL');
      }
    });
    call.on('end', function() {
        // The server has finished sending
        console.log("END");
      });
    call.on('status', function(status) {
      // Process status
      console.log("Current status: " + status);
    });
  });

  socket.on('CONNECT_PEER', function (peer) {
    LightningUtils.connectPeer(peer.pk, peer.ip, function(response){
      getPeers(socket);
    })
  });

  socket.on('DISCONNECT_PEER', function (peer) {
    LightningUtils.disconnectPeer(peer.pub_key, function(response){
      getPeers(socket);
    })
  });

});


function getPeers(socket){
  LightningUtils.listPeers((response) =>{
    if(response){
      socket.emit("PEER_INFO", response);
    } else {
      socket.emit("CONNECT_FAILURE");
    }
  })
}

function getWalletBalance(socket){
  LightningUtils.getWalletBalance((response) =>{
    console.log(response);
    if(response){
      socket.emit("WALLET_INFO", response.balance);
    } else {
      socket.emit("CONNECT_FAILURE");
    }
  })
}
