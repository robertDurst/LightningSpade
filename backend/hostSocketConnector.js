const ioClient = require('socket.io-client');
const LightningUtils = require('./utils/LightningNetworkUtils');
let host_socket;
let local_socket;

async function connect(address, socket, channel_info){
  host_socket = ioClient(address);

  let response = await LightningUtils.getInfo();
  const pub_key = response.identity_pubkey;

  host_socket.emit('VERACK', channel_info, pub_key);

  host_socket.on('VERACK_RECEIVED', async function(msg) {
    let response = await LightningUtils.signMessage(msg);
    host_socket.emit("ID_VERIFY", response)
  });

  host_socket.on('ID_VERIFIED', async function(gameState) {
    socket.emit('OPEN_CHANNEL', { channel_info: channel_info, gameState: gameState});
  });

  host_socket.on('GAME_STATE_UPDATE', function(gameState){
    socket.emit('GAME_STATE_UPDATE', gameState);
  })
}

async function reconnect(address, socket, channel_info){

  host_socket = ioClient(address);

  let response = await LightningUtils.getInfo();
  const pub_key = response.identity_pubkey;
  host_socket.emit('VERACK', channel_info, pub_key);

  host_socket.on('VERACK_RECEIVED', async function(msg) {

    let response = await LightningUtils.signMessage(msg);
    host_socket.emit("ID_VERIFY", response)
  });

  host_socket.on('ID_VERIFIED', async function(gameState) {
      socket.emit("CONNECT_SUCCESS", {pending_closed_channels: false, pending_open_channels: false, open_channels: true, channel_data: channel_info, gameState: gameState});
  });

  host_socket.on('GAME_STATE_UPDATE', function(gameState){
    socket.emit('GAME_STATE_UPDATE', gameState);
  })

  host_socket.on('YOUR_TURN', function(gameState){
    socket.emit('YOUR_TURN', gameState);
  })
}

function nextGameState(){
  host_socket.emit('NEXT_STATE');
}

function moveMade(move){
  host_socket.emit('MOVE_MADE', move);
}

async function exitGame(){
  let response = await LightningUtils.getInfo();
  const pub_key = response.identity_pubkey;
  host_socket.emit('EXIT_GAME', pub_key);
}


module.exports = {
  connect,
  reconnect,
  nextGameState,
  moveMade,
  exitGame
}
