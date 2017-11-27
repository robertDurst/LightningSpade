// This file contains the channel pending container. This deals with
// the logic that comes with the channel pending component.
// TODO consolidate socket logic to a single container of sorts.

import React from 'react';
import ChannelPendingView from '../components/ChannelPendingView';
import { connect } from 'react-redux';
import { channelConnect, channelDisconnect } from '../actions/index';

class ChannelPendingViewContainer extends React.Component {
  componentDidMount() {
    if(!this.props.socket) window.location.hash = '/';
    else {
      const self = this;
      this.props.socket.on("OPEN_CHANNEL", function(data){
        self.props.onChannelOpen(data.channel_info, data.gameState);
        window.location.hash = '/pokergameroom';
      });
      this.props.socket.on("CLOSE_CHANNEL", function(data){
        self.props.onChannelClose();
        window.location.hash = '/main';
      });
    }
  }

  render() {
    return (
      <ChannelPendingView />
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChannelOpen: (channel, gameState) => dispatch(channelConnect(channel, gameState)),
    onChannelClose: () => dispatch(channelDisconnect()),
  };
};

const mapStateToProps = (state) => {
  return {
    socket: state.socket,
    channel: state.channel,
    gameState: state.gameState,
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(ChannelPendingViewContainer);
