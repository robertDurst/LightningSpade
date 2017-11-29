import { channelConnect, channelDisconnect, channelPending, peersUpdate, balanceUpdate, gameStateUpdate, userUpdate, userTurn } from '../actions/index';
import { store } from '../store/configureStore';

export default (socket) => {

  socket.on('PENDING_CHANNEL', function(){
    window.location.hash = '/pendingchannel';
  })

  socket.on("CONNECT_FAILURE", function(data){
    alert("Failure!")
  });

  socket.on("PENDING_CHANNEL", function(data){
    window.location.hash = '/pendingchannel';
  });

  socket.on("OPEN_CHANNEL", function(data){
    store.dispatch(channelConnect(data.channel_info, data.gameState));
    window.location.hash = '/pokergameroom';
  });
  socket.on("CLOSE_CHANNEL", function(data){
    store.dispatch(channelDisconnect());
    window.location.hash = '/main';
  });

  socket.on("CONNECT_SUCCESS", function(data){
    alert("Node is connected!")
    if(data.pending_closed_channels || data.pending_open_channels){
      store.dispatch(channelPending(data.channel_data));
      window.location.hash = '/pendingchannel';
    }
    else if(data.open_channels){
      store.dispatch(channelConnect(data.channel_data, data.gameState));
      window.location.hash = '/pokergameroom';
    }
    else window.location.hash = '/main';
  });

  socket.on("PEER_INFO", function(data){
    store.dispatch(peersUpdate(data.peers));
  });

  socket.on("WALLET_INFO", function(data){
     store.dispatch(balanceUpdate(data));
  });

  socket.on("USER_INFO", function(data){
     store.dispatch(userUpdate(data));
  });

  socket.on("GAME_STATE_UPDATE", function(data){
     store.dispatch(gameStateUpdate(data));
  });

  socket.on("YOUR_TURN", function(data){
     store.dispatch(userTurn());
     // alert('Your turn');
     // socket.emit('MOVE_MADE', 'check');
  });
}
