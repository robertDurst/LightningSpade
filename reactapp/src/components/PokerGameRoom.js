// This file contains the poker game room component.
// This component is made up of players and a poker
// table and is Lightning Spade's main game room.

import React from 'react';
import '../stylesheets/PokerGameRoom.css';
import {RaisedButton} from 'material-ui/';
import Player from './Player';
import PokerTable from './PokerTable';

export default ({players, spread, closeChannel}) => (
  <div className={'pokergameroom-container'}>
    <RaisedButton
      label="Leave"
      onClick={() => closeChannel()}
      style={{position: 'absolute', left: 0, top: 0}}
    />
    <div className={'pokergameroom'}>
        <div className={'left_player-container'}>
          <Player player={players[0]}/>
        </div>
        <div className={'body_pokertable-container'}>
          <div className={'top-player-container'}>
            <Player player={players[1]}/>
            <Player player={players[2]}/>
            <Player player={players[3]}/>
          </div>
          <div className={'pokertable-container'}>
            <PokerTable spread={spread}/>
          </div>
          <div className={'bottom-player-container'}>
            <Player player={players[4]}/>
            <Player player={players[5]}/>
            <Player player={players[6]}/>
          </div>
        </div>
        <div className={'right_player-container'}>
          <Player player={players[7]}/>
        </div>
    </div>
  </div>
);
