// This file contains the poker game room container. This deals with
// the logic that comes with the poker game room component.

import React from 'react';
import PokerGameRoomView from '../components/PokerGameRoomView';
import { connect } from 'react-redux';

class PokerGameRoomViewContainer extends React.Component {
  componentWillMount() { if(!this.props.socket || !this.props.gameState) window.location.hash = '/' }
  closeChannel() { this.props.socket.emit('CLOSE_CHANNEL', this.props.channel) }
  nextState() {
    console.log("here");
    this.props.socket.emit('NEXT_STATE')
  }

  render() {
    return Object.keys(this.props.gameState).length ?  (
      <PokerGameRoomView
        closeChannel={this.closeChannel.bind(this)}
        players={this.props.gameState.playerContainer.players}
        spread={spreadToCardArray(this.props.gameState.spread)}
        nextState={this.nextState.bind(this)}
      />
    ) : <div></div>
  }
};

function spreadToCardArray(spread){
  let returnArr = [];
  for(var i = 0; i < 5; i ++) {
    if(spread[i]){
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


export default connect(mapStateToProps, null)(PokerGameRoomViewContainer);
