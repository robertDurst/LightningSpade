// This file contains the poker game room component.
// This component is made up of players and a poker
// table and is Lightning Spade's main game room.

import React from 'react';
import '../stylesheets/PokerGameRoomView.css';
import {RaisedButton} from 'material-ui/';
import Player from './Player';
import PokerTable from './PokerTable';

export default ({players, spread, closeChannel, nextState, winner, stateNum, makeMove, userState}) => (
  <div className={'PokerGameRoomView__container'}>
    {
      userState === 'betting' ? <RaisedButton
        label={'Bet'}
        onClick={() => makeMove()}
        style={{position: 'absolute', right: 0, top: 0}}
      /> : <RaisedButton
        label={'Next'}
        onClick={() => nextState()}
        style={{position: 'absolute', right: 0, top: 0}}
      />
    }
    <RaisedButton
      label={'Leave'}
      onClick={() => closeChannel()}
      style={{position: 'absolute', left: 0, top: 0}}
    />
    <div style={{position: 'absolute', left: 0, bottom: 0, padding: 10}}>
      Players in Room: {players.length}
    </div>
    <div style={{position: 'absolute', right: 0, bottom: 0, padding: 10}}>
      Current Game State: {stateNum} <br /> Current User State: {userState}
    </div>
    <div className={'PokerGameRoomView'}>
        <div className={'PokerGameRoomView__left_player_container'}>
          <Player player={players[0]} winner={winner}/>
        </div>
        <div className={'PokerGameRoomView__body'}>
          <div className={'PokerGameRoomView__top_player_container'}>
            <Player player={players[1]} winner={winner}/>
            <Player player={players[2]} winner={winner}/>
            <Player player={players[3]} winner={winner}/>
          </div>
          <div className={'PokerGameRoomView__pokertable_container'}>
            <PokerTable spread={spread}/>
          </div>
          <div className={'PokerGameRoomView__bottom_player_container'}>
            <Player player={players[4]} winner={winner}/>
            <Player player={players[5]} winner={winner}/>
            <Player player={players[6]} winner={winner}/>
          </div>
        </div>
        <div className={'PokerGameRoomView__right_player_container'}>
          <Player player={players[7]} winner={winner}/>
        </div>
    </div>
  </div>
);
