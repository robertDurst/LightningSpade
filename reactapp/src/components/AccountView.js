// This file contains the account view component.

import React, { Component } from 'react';
import '../stylesheets/AccountView.css';
import { RaisedButton, Dialog, FlatButton, TextField } from 'material-ui';
import AddConnectionIcon from 'material-ui/svg-icons/social/person-add';
import DisconnectIcon from 'material-ui/svg-icons/content/clear';
import PeerList from './PeerList';
import AccountHeader from './AccountHeader';
import PeerConnectionPopup from './PeerConnectionPopup';

class LNConnect extends Component {
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

  handleInputNewPeer(option, e) {
    if(option === 'pk') {
      this.setState({
        newPeer_pk: e.target.value,
      })
    } else if(option === 'ip') {
      this.setState({
        newPeer_ip: e.target.value,
      })
    }
  }

  handleClick(peer_info, e) {
    this.setState({
      open: true,
      selectedPeer: peer_info
    });
  }

  handleClick_Connect() {
    this.setState({
      open_connect: true,
    });
  }

  handlePeerOption(option) {
    if(option === 'Disconnect') {
      this.props.disconnectPeer(this.state.selectedPeer);
      this.setState({
        open: false,
        selectedPeer: {}
      });
    } else if(option === 'Open Channel') {
      this.props.openChannel(this.state.selectedPeer);
      this.setState({
        open: false,
        selectedPeer: {}
      });
    } else if(option === 'Connect') {
      this.props.connectPeer({ip: this.state.newPeer_ip, pk: this.state.newPeer_pk});
      this.setState({
        open_connect: false,
        newPeer_ip: "",
        newPeer_pk: ""
      });
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

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Disconnect"
        primary={true}
        onClick={this.handlePeerOption.bind(this, 'Disconnect')}
      />,
      <FlatButton
        label="Open Channel"
        primary={true}
        onClick={this.handlePeerOption.bind(this, 'Open Channel')}
      />,
    ];

    const actions_connect = [
      <FlatButton
        label={'Cancel'}
        primary={true}
        onClick={this.handleClose.bind(this)}
      />,
      <FlatButton
        label={'Connect'}
        primary={true}
        onClick={this.handlePeerOption.bind(this, 'Connect')}
      />
    ];



    return (
      <div className={'AccountView__container'}>
        <AccountHeader handleClick={this.handleClick_Connect.bind(this)} balance={this.props.balance}/>
        <PeerList handleClick={this.handleClick.bind(this)} peers={this.props.peers} />
        <div className={'AccountView__peerlistbutton_container'}>
            <RaisedButton
              icon={<DisconnectIcon />}
              label="Disconnect From All"
              labelColor={'white'}
              backgroundColor={'red'}
              className={'disconnect_button'}
            />
          </div>
        <Dialog
          title="Peer Options"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <p>PK Address: {this.state.selectedPeer.pub_key}</p>
          <p>Ip Address:{this.state.selectedPeer.address}</p>
        </Dialog>
      <PeerConnectionPopup handleInputNewPeer={this.handleInputNewPeer.bind(this)} open={this.state.open_connect} actions_connect={actions_connect}/>

      </div>
    );
  }
}

export default LNConnect;
