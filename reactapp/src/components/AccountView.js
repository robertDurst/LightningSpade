// This file contains the account view component.

import React, { Component } from 'react';
import '../stylesheets/AccountView.css';
import { FlatButton } from 'material-ui';
import PeerList from './PeerList';
import AccountHeader from './AccountHeader';
import AccountFooter from './AccountFooter';
import PeerConnectionPopup from './PeerConnectionPopup';
import PeerOptionsPopup from './PeerOptionsPopup';

class AccountView extends Component {
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleClose.bind(this)}
      />,
      <FlatButton
        label="Disconnect"
        primary={true}
        onClick={this.props.handlePeerOption.bind(this, 'Disconnect')}
      />,
      <FlatButton
        label="Open Channel"
        primary={true}
        onClick={this.props.handlePeerOption.bind(this, 'Open Channel')}
      />,
    ];

    const actions_connect = [
      <FlatButton
        label={'Cancel'}
        primary={true}
        onClick={this.props.handleClose.bind(this)}
      />,
      <FlatButton
        label={'Connect'}
        primary={true}
        onClick={this.props.handlePeerOption.bind(this, 'Connect')}
      />
    ];

    return (
      <div className={'AccountView__container'}>
        <AccountHeader handleClick={this.props.handleClick_Connect.bind(this)} balance={this.props.balance}/>
        <PeerList handleClick={this.props.handleClick.bind(this)} peers={this.props.peers} />
        <AccountFooter />
        <PeerOptionsPopup selectedPeer={this.props.selectedPeer} open={this.props.open} actions={actions} />
        <PeerConnectionPopup handleInputNewPeer={this.props.handleInputNewPeer.bind(this)} open={this.props.open_connect} actions_connect={actions_connect}/>
      </div>
    );
  }
}

export default AccountView;
