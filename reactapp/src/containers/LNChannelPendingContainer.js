import React from 'react';
import LNChannelPending from '../components/LNChannelPending';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { channelConnect, channelDisconnect } from '../actions/index';

class LNChannelPendingContainer extends React.Component {
  constructor() {
      super();
  }

  componentDidMount() {
    if(!this.props.socket) window.location.hash = '/';
    else {
      const self = this;
      this.props.socket.on("OPEN_CHANNEL", function(data){
        self.props.onChannelOpen(data);
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
      <LNChannelPending />
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChannelOpen: (channel) => dispatch(channelConnect(channel)),
    onChannelClose: () => dispatch(channelDisconnect()),
  };
};

const mapStateToProps = (state) => {
  return {
    socket: state.socket,
    channel: state.channel
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(LNChannelPendingContainer);
