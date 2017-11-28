//This file contains the Peer Options modal for the Account View Component: AccountView.js

import React from 'react';
import '../stylesheets/AccountView.css';
import { Dialog, FlatButton } from 'material-ui';

export default ({ selectedPeer, open, handleClose, handlePeerOption }) => {
  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onClick={handleClose.bind(this)}
    />,
    <FlatButton
      label="Disconnect"
      primary={true}
      onClick={handlePeerOption.bind(this, 'Disconnect')}
    />,
    <FlatButton
      label="Open Channel"
      primary={true}
      onClick={handlePeerOption.bind(this, 'Open Channel')}
    />,
  ];

 return(
    <Dialog
      title="Peer Options"
      actions={actions}
      modal={true}
      open={open}
    >
      <p>PK Address: {selectedPeer.pub_key}</p>
      <p>Ip Address:{selectedPeer.address}</p>
    </Dialog>
  );
}
