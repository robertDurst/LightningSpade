const chai = require('chai');
const Lightning = require('../utils/LightningNetworkUtils');
var shell_cmd = require('shelljs')

var assert = chai.assert;

const peer_pk = "027ee89ab830280075703667bc254d05f17f12490adbf25075c0a7ea9ad1b4ea5f";
const peer_ip = "127.0.0.1:10012";

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

  it('should open a channel', async function(){

    // Check that the channel is now confirmed open
    try {
      // Open a channel

      await Lightning.testOpenChannel(peer_pk, 16000000);

      // // Mine a block
      shell_cmd.exec("btcctl --simnet --rpcuser=kek --rpcpass=kek generate 1");
      const response = await Lightning.getOpenChannels();
      assert.lengthOf(response.channels, 1);
    } catch(err) {
      assert.equal(err, undefined, "\n\n Expected there to be one channel open\n\n")
    }
  });

});
