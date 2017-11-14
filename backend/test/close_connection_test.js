const chai = require('chai');
const Lightning = require('../utils/LightningNetworkUtils');
var assert = chai.assert;

const peer_pk = "027ee89ab830280075703667bc254d05f17f12490adbf25075c0a7ea9ad1b4ea5f";
const peer_ip = "127.0.0.1:10012";


describe('Disconnect from a peer', function(){
    this.timeout(3000);


    it('should still be connected to specified peer\nPK: '+peer_pk+'\nIP: '+peer_ip, async function() {
        setTimeout( async function(){
      try {
        const response = await Lightning.listPeers();
        assert.lengthOf(response.peers, 1);
        assert.equal(response.peers[0].pub_key, peer_pk);
        assert.equal(response.peers[0].address, peer_ip);
      } catch(err) {
        assert.equal(err, undefined,  "\n\nExpected peer not connected\nTO FIX: Check that disconnect never accidentally called\n\n");
      }
    }, 2000);
    })

    it('should disconnect from specified peer', async function() {
        setTimeout( async function(){
      try {
        const response = await Lightning.disconnectFromPeer(peer_pk);
      } catch(err) {
        assert.equal(err, undefined,  "\n\nTO FIX: Check that peer_pk is correct and you are not already disconnected\n\n");
      }
    }, 2000);
    })

    it('should not have any connections', async function() {
        setTimeout( async function(){
      try {
        const response = await Lightning.listPeers();
        assert.lengthOf(response.peers, 0);
      } catch(err) {
        assert.equal(err, undefined,  "\n\nPeer disconection failed\n\n");
      }
    }, 3000);
    })

});
