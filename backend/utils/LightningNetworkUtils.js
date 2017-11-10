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
const BufferUtil = bitcore.util.buffer;

function getInfo(cb) {
  lightning.getInfo({}, function(err, response) {
    cb(response);
  })
}

function listPeers(cb) {
  lightning.listPeers({}, function(err, response) {
    cb(response);
  })
}

function disconnectPeer(peer_pk, cb) {
  lightning.disconnectPeer({ pub_key: peer_pk}, function(err, response) {
    cb(response)
  })
}

function connectPeer(peer_pk, peer_ip, cb) {
  lightning.connectPeer({addr: {
    pubkey: peer_pk,
    host: peer_ip
    }}, function(err, response) {
    cb(response)
  })
}

function getWalletBalance(cb) {
  lightning.walletBalance({}, function(err, response) {
    cb(response);
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
  // var formatted_funding_txid = funding_txid.match(/.{2}/g).reverse().join("");
  // var dest_pubkey_bytes = BufferUtil.hexToBuffer(rex);
  // return lightning.closeChannel({
  //     channel_point: {
  //       funding_txid: dest_pubkey_bytes,
  //       output_index: parseInt(output_index)
  //     }
  //   })
  return lightning.closeChannel({
    channel_point
  })
}

module.exports = {
  getInfo,
  listPeers,
  disconnectPeer,
  connectPeer,
  getWalletBalance,
  openChannel,
  closeChannel
}
