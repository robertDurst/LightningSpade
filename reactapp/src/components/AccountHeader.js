import React from 'react';
import '../stylesheets/AccountView.css';
import { RaisedButton } from 'material-ui';
import AddConnectionIcon from 'material-ui/svg-icons/social/person-add';

export default ({handleClick, balance}) => (
  <div className={'AccountView__header_container'}>
    <RaisedButton
      icon={<AddConnectionIcon />}
      label={'Connect'}
      labelColor={'white'}
      backgroundColor={'green'}
      className={'AccountView__connectbutton'}
      onClick={handleClick}
    />
    <h1 className={'AccountView__fundslabel'}>Funds: {balance/100000000.0} BTC</h1>
  </div>
);
