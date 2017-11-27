// The file contains the channel pending component. Currently, this component
// is very simple. It will eventually tell the user whether they are
// waiting for a channel to open or to close. It should probably also have
// some explanation for LN and Bitcoin noobs.

import React from 'react';
import '../stylesheets/LNChannelPending.css';

export default () => (
  <div className={'LNChannelPending_container'}>
    <img src='https://media.giphy.com/media/26u4nsirFNig64Wwo/giphy.gif' alt='img'/>
    <h1>Channel Pending the mining of a block, please wait!</h1>
  </div>
);
