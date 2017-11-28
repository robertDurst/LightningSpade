// This file contains the poker game room component.
// This component is made up of players and a poker
// table and is Lightning Spade's main game room.

import React from 'react';
import '../stylesheets/PokerGameRoomView.css';
import {RaisedButton} from 'material-ui/';
import Player from './Player';
import PokerTable from './PokerTable';

export default ({players, spread, closeChannel, nextState}) => (
  <div className={'PokerGameRoomView__container'}>
    <RaisedButton
      label={'Leave'}
      onClick={() => closeChannel()}
      style={{position: 'absolute', left: 0, top: 0}}
    />
    <RaisedButton
      label={'Next'}
      onClick={() => nextState()}
      style={{position: 'absolute', right: 0, top: 0}}
    />
    <div className={'PokerGameRoomView'}>
        <div className={'PokerGameRoomView__left_player_container'}>
          <Player player={players[0]}/>
        </div>
        <div className={'PokerGameRoomView__body'}>
          <div className={'PokerGameRoomView__top_player_container'}>
            <Player player={players[1]}/>
            <Player player={players[2]}/>
            <Player player={players[3]}/>
          </div>
          <div className={'PokerGameRoomView__pokertable_container'}>
            <PokerTable spread={spread}/>
          </div>
          <div className={'PokerGameRoomView__bottom_player_container'}>
            <Player player={players[4]}/>
            <Player player={players[5]}/>
            <Player player={players[6]}/>
          </div>
        </div>
        <div className={'PokerGameRoomView__right_player_container'}>
          <Player player={players[7]}/>
        </div>
    </div>
  </div>
);
