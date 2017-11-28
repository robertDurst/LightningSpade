// This file contains the account page container. This deals with
// the logic that comes with the account page component.

import React from 'react';
import AccountView from '../components/AccountView';
import { connect } from 'react-redux';
import { peersUpdate, balanceUpdate } from '../actions/index';

class AccountViewContainer extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        open: false,
        open_connect: false,
        selectedPeer: {},
        newPeer_pk: "",
        newPeer_ip: ""
      }
  }

  componentDidMount() {
    if(!this.props.socket) {
      window.location.hash = '/';
    } else {
      this.props.socket.emit('GET_PEERS');
      this.props.socket.emit('GET_WALLET');
    }
  }

  handleInputNewPeer(option, e) {
    if(option === 'pk') this.setState({newPeer_pk: e.target.value})
    else if(option === 'ip') this.setState({newPeer_ip: e.target.value})
  }

  handleClick(peer_info, e) {
    this.setState({
      open: true,
      selectedPeer: peer_info
    });
  }

  handleClick_Connect() {
    this.setState({open_connect: true});
  }

  handlePeerOption(option) {
    switch(option) {
      case 'Disconnect':
        this.props.socket.emit('DISCONNECT_PEER', this.state.selectedPeer);
        this.setState({
          open: false,
          selectedPeer: {}
        });
        break;
      case 'Open Channel':
        this.props.socket.emit('OPEN_CHANNEL', this.state.selectedPeer);
        this.setState({
          open: false,
          selectedPeer: {}
        });
        break;
      case 'Connect':
        this.props.socket.emit('CONNECT_PEER', {ip: this.state.newPeer_ip, pk: this.state.newPeer_pk});
        this.setState({
          open_connect: false,
          newPeer_ip: "",
          newPeer_pk: ""
        });
        break;
    }
  }

  handleClose() {
    this.setState({
      open: false,
      open_connect: false,
      selectedPeer: {},
      newPeer_ip: "",
      newPeer_pk: ""
    });
  }

  render() {
    return (
      <AccountView
        handleInputNewPeer={this.handleInputNewPeer.bind(this)}
        handleClick={this.handleClick.bind(this)}
        handleClick_Connect={this.handleClick_Connect.bind(this)}
        handlePeerOption={this.handlePeerOption.bind(this)}
        handleClose={this.handleClose.bind(this)}
        selectedPeer={this.state.selectedPeer}
        peers={this.props.userState.peers}
        open={this.state.open}
        open_connect={this.state.open_connect}
        balance={this.props.userState.balance}
      />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    socket: state.socket,
    userState: state.userState,
  }
};


export default connect(mapStateToProps, null)(AccountViewContainer);
