// This file contains the account view component.

import React, { Component } from 'react';
import '../stylesheets/AccountView.css';
import PeerList from './PeerList';
import AccountHeader from './AccountHeader';
import AccountFooter from './AccountFooter';
import PeerConnectionPopup from './PeerConnectionPopup';
import PeerOptionsPopup from './PeerOptionsPopup';

export default ({handleClick_Connect, handleClick, balance, peers, selectedPeer, open, handlePeerOption, handleClose, handleInputNewPeer, open_connect}) => (
  <div className={'AccountView__container'}>
    <AccountHeader
      handleClick={handleClick_Connect}
      balance={balance}
    />
    <PeerList
      handleClick={handleClick}
      peers={peers}
    />
    <AccountFooter />
    <PeerOptionsPopup
      selectedPeer={selectedPeer}
      open={open}
      handlePeerOption={handlePeerOption}
      handleClose={handleClose}
    />
    <PeerConnectionPopup
      handleInputNewPeer={handleInputNewPeer}
      open={open_connect}
      handlePeerOption={handlePeerOption}
      handleClose={handleClose}
    />
  </div>
);
