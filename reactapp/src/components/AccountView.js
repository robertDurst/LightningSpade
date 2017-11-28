// This file contains the account view component.

import React, { Component } from 'react';
import '../stylesheets/AccountView.css';
import PeerList from './PeerList';
import AccountHeader from './AccountHeader';
import AccountFooter from './AccountFooter';
import PeerConnectionPopup from './PeerConnectionPopup';
import PeerOptionsPopup from './PeerOptionsPopup';

export default () => (
  <div className={'AccountView__container'}>
    <AccountHeader handleClick={this.props.handleClick_Connect.bind(this)} balance={this.props.balance}/>
    <PeerList handleClick={this.props.handleClick.bind(this)} peers={this.props.peers} />
    <AccountFooter />
    <PeerOptionsPopup
      selectedPeer={this.props.selectedPeer}
      open={this.props.open}
      handlePeerOption={this.props.handlePeerOption}
      handleClose={this.props.handleClose}
    />
    <PeerConnectionPopup
      handleInputNewPeer={this.props.handleInputNewPeer.bind(this)}
      open={this.props.open_connect}
      handlePeerOption={this.props.handlePeerOption}
      handleClose={this.props.handleClose}
    />
  </div>
);
