// This file contains the player component.
// This component displays information
// relevant to the player.

import React from 'react';
import '../stylesheets/Player.css';
import Card from "./Card";

export default ({player, winner, isReveal}) => {
  return (
  <div
    className={'Player__container'}
    style={{backgroundColor: player ? winner && winner.map( x => x.pubKey).indexOf(player.pubKey) !== -1 ? "green" : winner ? "#FFCA28" : '#'+player.pubKey.slice(player.pubKey.length-6,player.pubKey.length) :"#FFCA28"}}
    >
      {
        winner && player &&  winner.map( x => x.pubKey).indexOf(player.pubKey) !== -1 ? 'WINNER' : ''
      }
    {
        (player && !winner && player.hand.length && (player.isUser || isReveal)) ?  <div>{player.hand[0].value + " of " + player.hand[0].suite} <br /><br />{player.hand[1].value + " of " + player.hand[1].suite}</div>: ''
    }


  </div>
);
}
