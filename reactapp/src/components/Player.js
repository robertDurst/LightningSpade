// This file contains the player component.
// This component displays information
// relevant to the player.

import React from 'react';
import '../stylesheets/Player.css';
import Card from "./Card";

export default ({player, winner}) => {
  return (
  <div
    className={'Player__container'}
    style={{backgroundColor: player ? winner && player.pubKey === winner.pubKey ? "green" : winner ? "#FFCA28" : '#'+player.pubKey.slice(player.pubKey.length-6,player.pubKey.length) :"#FFCA28"}}
    >
      {
        winner && player &&  player.pubKey === winner.pubKey ? 'WINNER' : ''
      }
    {
        (player && !winner && player.hand.length) ?  <div>{player.hand[0].value + " of " + player.hand[0].suite} <br /><br />{player.hand[1].value + " of " + player.hand[1].suite}</div>: ''
    }


  </div>
);
}
