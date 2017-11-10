var grpc = require('grpc');
var fs = require('fs');
var path = require('path');
var lndCert = fs.readFileSync("./lnd_connect_docs/tls.cert");
var credentials = grpc.credentials.createSsl(lndCert);
var lnrpcDescriptor = grpc.load("./lnd_connect_docs/rpc.proto");
var lnrpc = lnrpcDescriptor.lnrpc;
var lightning = new lnrpc.Lightning('localhost:10001', credentials);

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

module.exports = {
  getInfo,
  listPeers,
  disconnectPeer,
  connectPeer,
  getWalletBalance
}
