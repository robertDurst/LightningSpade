var grpc = require('grpc');
var fs = require('fs');
var path = require('path');
var lndCert = fs.readFileSync("./lnd_connect_docs/tls.cert");
var credentials = grpc.credentials.createSsl(lndCert);
var lnrpcDescriptor = grpc.load("./lnd_connect_docs/rpc.proto");
var lnrpc = lnrpcDescriptor.lnrpc;
var lightning = new lnrpc.Lightning('localhost:10003', credentials);
var ByteBuffer = require('bytebuffer');
var bitcore = require('bitcore-lib');
var Bluebird = require('bluebird');
const BufferUtil = bitcore.util.buffer;

function getInfo() {
  return new Promise( function(resolve, reject){
    lightning.getInfo({}, function(err, response) {
      err ? reject(err) : resolve(response);
    });
  })
}

function listPeers() {
  return new Promise( function(resolve, reject){
    lightning.listPeers({}, function(err, response) {
      err ? reject(err) : resolve(response);
    });
  })
}

function disconnectFromPeer(peer_pk) {
  return new Promise( function(resolve, reject){
    lightning.disconnectPeer({ pub_key: peer_pk}, function(err, response) {
      err ? reject(err) : resolve(response);
    });
  })
}

function connectPeer(peer_pk, peer_ip) {
  return new Promise( function(resolve, reject){
    lightning.connectPeer({addr: {
      pubkey: peer_pk,
      host: peer_ip
      }}, function(err, response) {
      err ? reject(err) : resolve(response);
    })
  })
}

function getWalletBalance() {
  return new Promise( function(resolve, reject){
    lightning.walletBalance({}, function(err, response) {
      err ? reject(err) : resolve(response);
    });
  })
}

function openChannel(pk, amount) {
  const dest_pubkey_bytes = ByteBuffer.fromHex(pk);
  return lightning.openChannel({
    node_pubkey: dest_pubkey_bytes,
    local_funding_amount: amount,
  })
}


function closeChannel(channel_point) {
  return lightning.closeChannel({
    channel_point
  })
}

module.exports = {
  getInfo,
  listPeers,
  disconnectFromPeer,
  connectPeer,
  getWalletBalance,
  openChannel,
  closeChannel,
}
