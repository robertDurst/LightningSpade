// This file contains the player component.
// This component displays information
// relevant to the player.

import React from 'react';
import '../stylesheets/Player.css';

export default ({player}) => (
  <div className={player ? 'Player__container': 'Player__container-empty'}>

  </div>
);
