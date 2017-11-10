import React, { Component } from 'react';
import '../stylesheets/LNMainPage.css';
import { Paper, RaisedButton, Dialog, FlatButton, TextField } from 'material-ui';
import AddConnectionIcon from 'material-ui/svg-icons/social/person-add';
import DisconnectIcon from 'material-ui/svg-icons/content/clear';

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
        label="Cancel"
        primary={true}
        onClick={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Connect"
        primary={true}
        onClick={this.handlePeerOption.bind(this, 'Connect')}
      />
    ];

    return (
      <div className={'LNMainPage_container'}>

        <div className={'Header_container'}>
          <RaisedButton
            icon={<AddConnectionIcon />}
            label="Connect"
            labelColor={'white'}
            backgroundColor={'green'}
            className={'connect_button'}
            onClick={this.handleClick_Connect.bind(this)}
          />
          <h1 className={'Funds_label'}>Funds: {this.props.balance/100000000.0} BTC</h1>
        </div>
        <div className={'Peer_container'}>
          <div className={'Peer_list_content_container'}>
            <div className={'Peer_list_content'}>
              <Paper
                zDepth={4}
                className={'Peer_list'}
                >
                  {
                    this.props.peers.map( x => {
                        return (
                          <div
                            onClick={this.handleClick.bind(this, x)}
                            key={x.peer_id}
                            id={x.peer_id}
                            className={'peer_connection_item_container'}
                            >
                            <p className={'peer_id_display'}>Peer Id: {x.peer_id}</p>
                            <p className={'pubkey_display'}>PubKey: {x.pub_key}</p>
                            <p className={'ip_address_display'}>Address: {x.address}</p>
                          </div>
                        )
                    })
                  }
              </Paper>
            </div>
          </div>
          <div className={'Peer_list_button_container'}>
            <RaisedButton
              icon={<DisconnectIcon />}
              label="Disconnect From All"
              labelColor={'white'}
              backgroundColor={'red'}
              className={'disconnect_button'}
            />
          </div>
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

        <Dialog
          title="Connect To a Peer"
          actions={actions_connect}
          modal={true}
          open={this.state.open_connect}
        >
          <TextField
            hintText="Public Key Address"
            onChange={this.handleInputNewPeer.bind(this, 'pk')}
          />
          <br />
          <TextField
            hintText="Host_IP:Port"
            onChange={this.handleInputNewPeer.bind(this, 'ip')}
          />
        </Dialog>
      </div>
    );
  }
}

export default LNConnect;
