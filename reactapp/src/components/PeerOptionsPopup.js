import React from 'react';
import '../stylesheets/AccountView.css';
import { Dialog } from 'material-ui';

export default ({selectedPeer, open, actions}) => (
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
