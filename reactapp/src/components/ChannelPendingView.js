// The file contains the channel pending component. Currently, this component
// is very simple. It will eventually tell the user whether they are
// waiting for a channel to open or to close. It should probably also have
// some explanation for LN and Bitcoin noobs.

import React from 'react';
import '../stylesheets/ChannelPendingView.css';

export default () => (
  <div className={'ChannelPendingView__container'}>
    <img className={'ChannelPendingView__img'} src={'https://media.giphy.com/media/26u4nsirFNig64Wwo/giphy.gif'} alt={'Loading GIF'}/>
    <h1>Channel pending the mining of a block, please wait!</h1>
  </div>
);
