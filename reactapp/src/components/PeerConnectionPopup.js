// This file contains the peer connection popup modal for the Account View Component: AccountView.js

import React from 'react';
import '../stylesheets/AccountView.css';
import { Dialog, TextField, FlatButton } from 'material-ui';

export default ({handleInputNewPeer, open, handlePeerOption, handleClose}) => {
  const actions_connect = [
    <FlatButton
      label={'Cancel'}
      primary={true}
      onClick={handleClose.bind(this)}
    />,
    <FlatButton
      label={'Connect'}
      primary={true}
      onClick={handlePeerOption.bind(this, 'Connect')}
    />
  ];

  return (
    <Dialog
      title="Connect To a Peer"
      actions={actions_connect}
      modal={true}
      open={open}
    >
      <TextField
        hintText="Public Key Address"
        onChange={handleInputNewPeer.bind(this, 'pk')}
      />
      <br />
      <TextField
        hintText="Host_IP:Port"
        onChange={handleInputNewPeer.bind(this, 'ip')}
      />
    </Dialog>
  );
}
