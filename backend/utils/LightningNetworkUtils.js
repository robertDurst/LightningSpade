const grpc = require('grpc');
const fs = require('fs');
const path = require('path');
const lndCert = fs.readFileSync("./lnd_connect_docs/tls.cert");
const credentials = grpc.credentials.createSsl(lndCert);
const lnrpcDescriptor = grpc.load("./lnd_connect_docs/rpc.proto");
const lnrpc = lnrpcDescriptor.lnrpc;
const lightning = new lnrpc.Lightning(process.env.CLIENT_LND_ADDRESS, credentials);
const ByteBuffer = require('bytebuffer');
const bitcore = require('bitcore-lib');
const Bluebird = require('bluebird');
const BufferUtil = bitcore.util.buffer;

getInfo = () => {
  return new Promise( function(resolve, reject){
    lightning.getInfo({}, function(err, response) {
      err ? reject(err) : resolve(response);
    });
  })
}

signMessage = (msg) => {
  return new Promise( function(resolve, reject){
    lightning.signMessage({
      msg
    }, function(err, response) {
      err ? reject(err) : resolve(response);
    });
  })
}

listPeers = () => {
  return new Promise( function(resolve, reject){
    lightning.listPeers({}, function(err, response) {
      err ? reject(err) : resolve(response);
    });
  })
}

listOpenChannels = () => {
  return new Promise( function(resolve, reject){
    lightning.listChannels({}, function(err, response) {
      err ? reject(err) : resolve(response);
    });
  })
}

listPendingChannels = () => {
  return new Promise( function(resolve, reject){
    lightning.pendingChannels({}, function(err, response) {
      err ? reject(err) : resolve(response);
    });
  })
}

disconnectFromPeer = (peer_pk) => {
  return new Promise( function(resolve, reject){
    lightning.disconnectPeer({ pub_key: peer_pk}, function(err, response) {
      err ? reject(err) : resolve(response);
    });
  })
}

connectPeer = (peer_pk, peer_ip) => {
  return new Promise( function(resolve, reject){
    lightning.connectPeer({addr: {
      pubkey: peer_pk,
      host: peer_ip
      }}, function(err, response) {
      err ? reject(err) : resolve(response);
    })
  })
}

getWalletBalance = () => {
  return new Promise( function(resolve, reject){
    lightning.walletBalance({}, function(err, response) {
      err ? reject(err) : resolve(response);
    });
  })
}

getPendingChannels = () => {
  return new Promise( function(resolve, reject){
    lightning.pendingChannels({}, function(err, response) {
      err ? reject(err) : resolve(response);
    });
  })
}

getOpenChannels = () => {
  return new Promise( function(resolve, reject){
    lightning.listChannels({}, function(err, response) {
      err ? reject(err) : resolve(response);
    });
  })
}

openChannel = (pk, amount) => {
  const dest_pubkey_bytes = ByteBuffer.fromHex(pk);
  return lightning.openChannel({
    node_pubkey: dest_pubkey_bytes,
    local_funding_amount: amount,
  })
}

testOpenChannel = (pk, amount) => {
  const dest_pubkey_bytes = ByteBuffer.fromHex(pk);
  return new Promise( function(resolve, reject){
    lightning.openChannelSync({
      node_pubkey: dest_pubkey_bytes,
      local_funding_amount: amount,
      node_pubkey_string: pk,
    }, function(err, response) {
      err ? reject(err) : resolve(response);
    });
  })
}

closeChannel = (channel_point) => {
  if (typeof channel_point === 'string'){
    return lightning.closeChannel({
      channel_point: {
            funding_txid: BufferUtil.hexToBuffer(channel_point.split(":")[0].match(/.{2}/g).reverse().join("")),
              output_index: parseInt(channel_point.split(":")[1])
        }
      })
  } else {
    return lightning.closeChannel({
      channel_point
    })
  }

}

subscribeChannelNotifications = () => {
  return lightning.subscribeChannelGraph({})
}

module.exports = {
  getInfo,
  signMessage,
  listPeers,
  listOpenChannels,
  listPendingChannels,
  disconnectFromPeer,
  connectPeer,
  getWalletBalance,
  getPendingChannels,
  getOpenChannels,
  openChannel,
  closeChannel,
  testOpenChannel,
  subscribeChannelNotifications
}
