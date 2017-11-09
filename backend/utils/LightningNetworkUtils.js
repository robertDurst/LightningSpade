var grpc = require('grpc');
var fs = require('fs');
var path = require('path');
var lndCert = fs.readFileSync("./lnd_connect_docs/tls.cert");
var credentials = grpc.credentials.createSsl(lndCert);
var lnrpcDescriptor = grpc.load("./lnd_connect_docs/rpc.proto");
var lnrpc = lnrpcDescriptor.lnrpc;
var lightning = new lnrpc.Lightning('localhost:10002', credentials);

function getInfo(cb){
  lightning.getInfo({}, function(err, response) {
    cb(response);
  })
}

module.exports = {
  getInfo
}
