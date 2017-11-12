var chai = require('chai');
var Lightning = require('../utils/LightningNetworkUtils');

var assert = chai.assert;

describe('Initial State', function() {
  it('should connect to the node', async function() {
    try {
      const response = await Lightning.getInfo();
      assert.notEqual(response, undefined);
      assert.typeOf(response, "object");
    } catch(err) {
      assert.equal(err, undefined, "\n\nTO FIX: Check to make sure:\na) connecting to correct port\nb) your lnd is running\nc) your lnd is unlocked\n\n");
    }
  });

  it('should not have any connections', async function() {
    try {
      const response = await Lightning.listPeers();
      assert.lengthOf(response.peers, 0);
    } catch(err) {
      assert.equal(err, undefined,  "\n\nTO FIX: Please disconnect from peers\n\n");
    }
  });
});

/*
  For this test, and the rest of the testing suite I will
  assume a second lnd set up on port 10012 and the corresponding
  identity_pubkey. You can find this pubkey running the getinfo
  commmand in the lncli. This will be the peer whom in the main
  application would be the central node, or the house.

  These will be different on your system. If you don't change
  these values, your test will fail!
*/

const peer_pk = "027ee89ab830280075703667bc254d05f17f12490adbf25075c0a7ea9ad1b4ea5f";
const peer_ip = "127.0.0.1:10012";

describe('Connect to a specified peer', function(){
  it('should connect specified a peer', async function() {
    try {
      const response = await Lightning.connectPeer(peer_pk, peer_ip);
    } catch(err) {
      assert.equal(err, undefined,  "\n\nTO FIX: Check that peer_ip and peer_pk are correct and you are not already connected\n\n");
    }
  });

  it('should connect to specified peer\nPK: '+peer_pk+'\nIP: '+peer_ip, async function() {
    try {
      const response = await Lightning.listPeers();
      assert.lengthOf(response.peers, 1);
      assert.equal(response.peers[0].pub_key, peer_pk);
      assert.equal(response.peers[0].address, peer_ip);
    } catch(err) {
      assert.equal(err, undefined,  "\n\nExpected peer not connected\nTO FIX: Check that peer_ip and peer_pk are correct and you are not already connected\n\n");
    }
  });

});

describe('Open a channel with a peer', function(){
  // Remember that this is satoshi's so 0.16 BTC = 1600000 sats
  // Not really necessary to have some many sats. The reason
  // 0.16 BTC required here is because we are testing with a max
  // sized channel.
  it('need a minimum balance of 0.16 BTC to open a channel', async function() {
    try {
      const response = await Lightning.getWalletBalance();
      assert.isAbove(parseInt(response.balance), 16000000);
    } catch(err) {
      assert.equal(err, undefined,  "\n\nExpected wallet balance to be above 0.16 BTC\nTO FIX: Use a faucet (testnet), beg for BTC (mainnet), or mine (regtest/simtest)\n\n");
    }
  });
});

describe('Close a channel with a peer', function(){

});

describe('Disconnect from a peer', function(){
  it('should still be connected to specified peer\nPK: '+peer_pk+'\nIP: '+peer_ip, async function() {
    try {
      const response = await Lightning.listPeers();
      assert.lengthOf(response.peers, 1);
      assert.equal(response.peers[0].pub_key, peer_pk);
      assert.equal(response.peers[0].address, peer_ip);
    } catch(err) {
      assert.equal(err, undefined,  "\n\nExpected peer not connected\nTO FIX: Check that disconnect never accidentally called\n\n");
    }
  });

  it('should disconnect from specified peer', async function() {
    try {
      const response = await Lightning.disconnectFromPeer(peer_pk);
    } catch(err) {
      assert.equal(err, undefined,  "\n\nTO FIX: Check that peer_pk is correct and you are not already disconnected\n\n");
    }
  });

  it('should not have any connections', async function() {
    try {
      const response = await Lightning.listPeers();
      assert.lengthOf(response.peers, 0);
    } catch(err) {
      assert.equal(err, undefined,  "\n\nPeer disconection failed\n\n");
    }
  });

});
