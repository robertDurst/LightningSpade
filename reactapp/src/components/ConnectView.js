// This file contains the landing page component.
// Right now, very simple with just a title and
// a connect button. Final product will
// be much more welcoming.

import React from 'react';
import '../stylesheets/ConnectView.css';
import {RaisedButton} from 'material-ui/';

export default ({clickHandler}) => (
  <div className={'ConnectView__container'}>
    <h1 className={"ConnectView__title"}>Lightning Spade</h1>
    <RaisedButton
      className={'ConnectView__connect_button'}
      label={"Connect"}
      onClick={clickHandler}
    />
  </div>
);
