// This file contains the poker game room container. This deals with
// the logic that comes with the poker game room component.

import React from 'react';
import PokerGameRoomView from '../components/PokerGameRoomView';
import { connect } from 'react-redux';
import { userMadeMove } from '../actions/index';

class PokerGameRoomViewContainer extends React.Component {
  componentWillMount() { if(!this.props.socket || !this.props.gameState) window.location.hash = '/' }
  closeChannel() { this.props.socket.emit('CLOSE_CHANNEL', this.props.channel) }
  nextState() {
    this.props.socket.emit('NEXT_STATE')
  }
  makeMove() {
    this.props.socket.emit('MOVE_MADE');
    this.props.onUserMadeMove('bet');
  }

  render() {
    console.log(this.props.userState);
    let winner;
    if(Object.keys(this.props.gameState).length) {
      if(this.props.gameState.winner) {
        winner = this.props.gameState.playerContainer.players[this.props.gameState.winner[0]];
      }
      this.props.gameState.playerContainer.players.forEach( x => x.isUser = (x.pubKey === this.props.userState.userInfo.identity_pubkey));
      this.props.gameState.playerContainer.players = this.props.gameState.playerContainer.players.sort( (x,y) => y.isUser - x.isUser);
    }
    return Object.keys(this.props.gameState).length ?  (
      <PokerGameRoomView
        closeChannel={this.closeChannel.bind(this)}
        players={this.props.gameState.playerContainer.players}
        spread={spreadToCardArray(this.props.gameState.spread)}
        nextState={this.nextState.bind(this)}
        winner={winner}
        stateNum={this.props.gameState.state}
        makeMove={this.makeMove.bind(this)}
        userState={this.props.userState.state}
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

const mapDispatchToProps = (dispatch) => {
  return {
    onUserMadeMove: (move) => dispatch(userMadeMove(move)),
  };
};

const mapStateToProps = (state) => {
  return {
    socket: state.socket,
    channel: state.channel,
    gameState: state.gameState,
    userState: state.userState,
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(PokerGameRoomViewContainer);
