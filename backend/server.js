const LightningUtils = require('./utils/LightningNetworkUtils');
const io = require('socket.io')(3001);

io.on('connection', function (socket) {
  console.log("New connection.");

  socket.on('CONNECT', async function (data) {
    try {
      const response_channels_open = await LightningUtils.listOpenChannels();
      const response_channels_pending = await LightningUtils.listPendingChannels();
      const open_channels = !!response_channels_open.channels.length;
      const pending_open_channels = !!response_channels_pending.pending_open_channels.length;
      const pending_closing_channels = !!response_channels_pending.pending_closing_channels.length;

      if(open_channels) {
        channel_info = response_channels_open.channels[0]
      }
      if(pending_open_channels) {
        channel_info = response_channels_pending.pending_open_channels[0]
        const call = LightningUtils.subscribeChannelNotifications();
        call.on('data', async function(message) {
          if(message.channel_updates[0] && message.channel_updates[0] && message.channel_updates[0].routing_policy.connecting_node === channel_info.channel.remote_pubkey){
            const response = await LightningUtils.listOpenChannels();
            channel_info = response.channels[0];
            socket.emit('OPEN_CHANNEL', channel_info);
          }
        });
      }

      if(pending_closing_channels) {
        channel_info = response_channels_pending.pending_closing_channels[0]
        const call = LightningUtils.subscribeChannelNotifications();
        const user_info = await LightningUtils.getInfo();
        console.log(user_info);
        call.on('data', async function(message) {
          socket.emit('CLOSE_CHANNEL');
        });
      }
      socket.emit("CONNECT_SUCCESS", {pending_closed_channels: pending_closing_channels, pending_open_channels: pending_open_channels, open_channels: open_channels, channel_data: pending_open_channels || pending_closing_channels || open_channels ? channel_info : undefined});
    } catch(err) {
      console.log(err);
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
    const call = LightningUtils.openChannel(peer.pub_key, 1000000);

    call.on('data', function(message) {
      if(message.update === 'chan_pending') {
        socket.emit('PENDING_CHANNEL');
      } else if(message.update === 'chan_open'){
        socket.emit('OPEN_CHANNEL', message.chan_open);
      }
    });
  });

  socket.on('CLOSE_CHANNEL', function (channel_data) {
    const call = LightningUtils.closeChannel(channel_data.channel_point);

    call.on('data', function(message) {
      if(message.update === 'close_pending') {
        socket.emit('PENDING_CHANNEL');
      } else if(message.update === 'chan_close'){
        socket.emit('CLOSE_CHANNEL');
      }
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

function toHexString(byteArray) {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}
