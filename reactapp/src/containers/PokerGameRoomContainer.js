import React from 'react';
import PokerGameRoom from '../components/PokerGameRoom';
import io from 'socket.io-client';
import { connect } from 'react-redux';

class PokerGameRoomContainer extends React.Component {
  constructor(props) {
      super(props);
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
    return (
      <PokerGameRoom closeChannel={this.closeChannel.bind(this)} players={this.props.gameState.playerContainer.players} spread={spreadToCardArray(this.props.gameState.spread)}/>
    );
  }
};

function spreadToCardArray(spread){
  let returnArr = [];
  for(var i = 0; i < 5; i ++) {
    if(spread[i]){
      console.log(spread[i]);
      returnArr.push(spread[i].value.toString()+"_"+spread[i].suite);
    }
    else returnArr.push('null');
  }
  return returnArr;
}

const mapStateToProps = (state) => {
  return {
    socket: state.socket,
    channel: state.channel,
    gameState: state.gameState,
  }
};


export default connect(mapStateToProps, null)(PokerGameRoomContainer);
