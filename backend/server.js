var LightningUtils = require('./utils/LightningNetworkUtils');
var io = require('socket.io')(3001);

io.on('connection', function (socket) {
  console.log("New connection.");

  socket.on('CONNECT', async function (data) {
    try {
      const response = await LightningUtils.getInfo();
      socket.emit("CONNECT_SUCCESS", response);
    } catch(err) {
      socket.emit("CONNECT_FAILURE");
    }
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

  socket.on('CONNECT_PEER', async function (peer) {
    try {
      const response = await LightningUtils.connectPeer(peer.pk, peer.ip);
      getPeers(socket);
    } catch(err) {
      socket.emit("CONNECT_FAILURE");
    }
  });

  socket.on('DISCONNECT_PEER', async function (peer) {
    try {
      const response = await LightningUtils.disconnectFromPeer(peer.pub_key);
      getPeers(socket);
    } catch(err) {
      socket.emit("CONNECT_FAILURE");
    }
  });

});


async function getPeers(socket){
  try {
    const response = await LightningUtils.listPeers();
    socket.emit("PEER_INFO", response);
  } catch(err) {
    socket.emit("CONNECT_FAILURE");
  }
}

async function getWalletBalance(socket){
  try {
    const response = await LightningUtils.getWalletBalance();
    socket.emit("WALLET_INFO", response.balance);
  } catch(err) {
    socket.emit("CONNECT_FAILURE");
  }
}
