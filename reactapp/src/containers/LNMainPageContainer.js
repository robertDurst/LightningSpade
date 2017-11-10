import React from 'react';
import io from 'socket.io-client';
import LNMainPage from '../components/LNMainPage';
import { connect } from 'react-redux';

class LNMainPageContainer extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        peers: [],
        balance: 'LOADING',
      }
  }

  componentDidMount() {
    if(!this.props.socket) {
      window.location.hash = '/';
    } else {
      this.props.socket.emit('GET_PEERS');
      this.props.socket.emit('GET_WALLET');

      const self = this;
      this.props.socket.on("PEER_INFO", function(data){
        self.setState({
          peers: data.peers
        })
      });

      this.props.socket.on("WALLET_INFO", function(data){
         self.setState({
           balance: data
         })
      });

      this.props.socket.on("PENDING_CHANNEL", function(data){
        window.location.hash = '/pendingchannel';
      });

      this.props.socket.on("CONNECT_FAILURE", function(data){
        alert("Failure!")
      });
    }
  }

  openChannel(peer_info) {
    this.props.socket.emit('OPEN_CHANNEL', peer_info);
  }

  disconnectPeer(peer_info) {
    this.props.socket.emit('DISCONNECT_PEER', peer_info);
  }

  connectPeer(peer_info) {
    this.props.socket.emit('CONNECT_PEER', peer_info);
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

const mapStateToProps = (state) => {
  return {
    socket: state.socket
  }
};


export default connect(mapStateToProps, null)(LNMainPageContainer);
