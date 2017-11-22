import React from 'react';
import LNConnect from '../components/LNConnect';
import io from 'socket.io-client';
import { socketConnect, channelConnect, channelPending } from '../actions/index';
import { connect } from 'react-redux';

class LNConnectContainer extends React.Component {
  constructor(props) {
      super(props);
    }

  componentDidMount() {
    const connected_socket = io("http://localhost:3001");
      var self = this;
      connected_socket.on("CONNECT_SUCCESS", function(data){
        alert("Node is connected!")
        if(data.pending_closed_channels || data.pending_open_channels){
          self.props.onChannelPending(data.channel_data);
          window.location.hash = '/pendingchannel';
        }
        else if(data.open_channels){
          console.log("here", this.props);
          self.props.onChannelOpen(data.channel_data, data.gameState);
          window.location.hash = '/pokergameroom';
        }
        else window.location.hash = '/main';
      });

      connected_socket.on("CONNECT_FAILURE", function(data){
        alert("Failure!")
      });

    this.props.onSocketConnect(connected_socket);
  }

  clickHandler() {
    this.props.socket.emit("CONNECT");
  }

  render() {
    return (
      <LNConnect clickHandler={this.clickHandler.bind(this)}/>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChannelOpen: (channel, gameState) => dispatch(channelConnect(channel, gameState)),
    onChannelPending: (channel) => dispatch(channelPending(channel)),
    onSocketConnect: (socket) => dispatch(socketConnect(socket)),
  };
};

const mapStateToProps = (state) => {
  return {
    socket: state.socket,
    channel: state.channel,
    gameState: state.gameState
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LNConnectContainer);
