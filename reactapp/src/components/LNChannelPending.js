import React, { Component } from 'react';
import '../stylesheets/LNChannelPending.css';

class LNChannelPending extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'LNChannelPending_container'}>
        <img src='https://media.giphy.com/media/26u4nsirFNig64Wwo/giphy.gif' />
        <h1>Channel Pending the mining of a block, please wait!</h1>
      </div>
    );
  }
}

export default LNChannelPending;
