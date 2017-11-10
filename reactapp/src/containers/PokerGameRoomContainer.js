import React from 'react';
import PokerGameRoom from '../components/PokerGameRoom';
import io from 'socket.io-client';
import { connect } from 'react-redux';

class PokerGameRoomContainer extends React.Component {
  constructor() {
      super();
  }

  closeChannel() {
    this.props.socket.emit('CLOSE_CHANNEL', this.props.channel);

    this.props.socket.on('PENDING_CHANNEL', function(){
      window.location.hash = '/pendingchannel';
    })
  }

  render() {
    console.log("POKER", this.props);
    return (
      <PokerGameRoom closeChannel={this.closeChannel.bind(this)}/>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    socket: state.socket,
    channel: state.channel
  }
};


export default connect(mapStateToProps, null)(PokerGameRoomContainer);
