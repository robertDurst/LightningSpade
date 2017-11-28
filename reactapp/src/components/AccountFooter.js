// This file contains the footer component for the Account View Component: AccountView.js

import React from 'react';
import '../stylesheets/AccountView.css';
import { RaisedButton } from 'material-ui';
import DisconnectIcon from 'material-ui/svg-icons/content/clear';

export default () => (
  <div className={'AccountView__peerlistbutton_container'}>
      <RaisedButton
        icon={<DisconnectIcon />}
        label="Disconnect From All"
        labelColor={'white'}
        backgroundColor={'red'}
        className={'disconnect_button'}
      />
    </div>
);
