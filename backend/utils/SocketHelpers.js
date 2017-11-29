const LightningUtils = require('./LightningNetworkUtils');

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

async function getUserInfo(socket){
  try {
    const response = await LightningUtils.getInfo();
    socket.emit("USER_INFO", response);
  } catch(err) {
    socket.emit("CONNECT_FAILURE");
  }
}

function toHexString(buffer){
  var str = buffer.toString('hex')
	var reversed = str.split("").reverse();
	return reversed.map((x,i) => !((i+1)%2) ? reversed[i-1] : reversed[i+1]).join("");
}

module.exports = {
  getPeers,
  getWalletBalance,
  getUserInfo,
  toHexString
}
