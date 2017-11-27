// This file contains the landing page component.
// Right now, very simple with just a title and
// a connect button. Final product will
// be much more welcoming.

import React from 'react';
import '../stylesheets/LNConnect.css';
import {RaisedButton} from 'material-ui/';

export default ({clickHandler}) => (
  <div className={'LNConnect_container'}>
    <h1 className="connect_title_text">Lightning Spade</h1>
    <RaisedButton
      className={'connect_button_connectNode'}
      label="Connect"
      onClick={clickHandler}
    />
  </div>
);
