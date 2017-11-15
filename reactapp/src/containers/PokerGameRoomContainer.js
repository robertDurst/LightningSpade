import React from 'react';
import PokerGameRoom from '../components/PokerGameRoom';
import io from 'socket.io-client';
import { connect } from 'react-redux';

class PokerGameRoomContainer extends React.Component {
  constructor() {
      super();
  }

  componentDidMount() {
    if(!this.props.socket) window.location.hash = '/';
  }

  closeChannel() {
    this.props.socket.emit('CLOSE_CHANNEL', this.props.channel);

    this.props.socket.on('PENDING_CHANNEL', function(){
      window.location.hash = '/pendingchannel';
    })
  }

  render() {
    console.log("POKER", this.props.gameState);
    return (
      <PokerGameRoom closeChannel={this.closeChannel.bind(this)} players={this.props.gameState}/>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    socket: state.socket,
    channel: state.channel,
    gameState: state.gameState,
  }
};


export default connect(mapStateToProps, null)(PokerGameRoomContainer);
