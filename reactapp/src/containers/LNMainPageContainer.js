import React from 'react';
import io from 'socket.io-client';
import LNMainPage from '../components/LNMainPage';


class LNConnectContainer extends React.Component {
  constructor(props) {
      super(props);
  }

  componentWillMount() {
    const socket = io("http://localhost:3001");

    this.state = {
      socket,
      peers: [],
      balance: 'LOADING',
    }

    this.state.socket.emit('GET_PEERS');
    this.state.socket.emit('GET_WALLET');

    const self = this;
    this.state.socket.on("PEER_INFO", function(data){
      self.setState({
        peers: data.peers
      })
    });

    this.state.socket.on("WALLET_INFO", function(data){
       self.setState({
         balance: data
       })
    });

    this.state.socket.on("CONNECT_FAILURE", function(data){
      alert("Failure!")
    });
  }

  openChannel(peer_info) {
    this.state.socket.emit('OPEN_CHANNEL', peer_info);
  }

  disconnectPeer(peer_info) {
    this.state.socket.emit('DISCONNECT_PEER', peer_info);
  }

  connectPeer(peer_info) {
    this.state.socket.emit('CONNECT_PEER', peer_info);
  }

  render() {
    return (
      <LNMainPage
        peers={this.state.peers}
        openChannel={this.openChannel.bind(this)}
        disconnectPeer={this.disconnectPeer.bind(this)}
        connectPeer={this.connectPeer.bind(this)}
        balance={this.state.balance}
      />
    );
  }
};

export default LNConnectContainer;
