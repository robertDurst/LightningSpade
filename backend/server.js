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
    console.log("Open Channel", peer);
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
