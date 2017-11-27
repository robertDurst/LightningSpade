import React from 'react';
import '../stylesheets/AccountView.css';
import { Dialog, TextField, FlatButton } from 'material-ui';
import AddConnectionIcon from 'material-ui/svg-icons/social/person-add';



export default ({handleInputNewPeer, open, actions_connect}) => (
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
