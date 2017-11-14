const chai = require('chai');
const Lightning = require('../utils/LightningNetworkUtils');
var shell_cmd = require('shelljs')

var assert = chai.assert;

describe('Close a channel with a peer', function(){
  it('should close a channel to pending state', async function() {
    setTimeout(async function () {
      try {
        const response1 = await Lightning.getOpenChannels();
        assert.lengthOf(response1.channels, 1);
        var call = Lightning.closeChannel(response1.channels[0].channel_point);
        call.on('data', async function(message) {
          if(message.update === 'close_pending') {
            shell_cmd.exec("btcctl --simnet --rpcuser=kek --rpcpass=kek generate 1");
          } else if(message.update === 'chan_close'){
            const response2 = await Lightning.getOpenChannels();
            assert.lengthOf(response2.channels, 0);
          }
        });
      } catch(err) {
        assert.equal(err, undefined, "\n\n Expected there to be no channels open\n\n")
      }


    }, 1000);
  });
  this.timeout(1000);
});
