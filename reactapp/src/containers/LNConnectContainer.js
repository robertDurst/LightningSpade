import React from 'react';
import LNConnect from '../components/LNConnect';
import io from 'socket.io-client';
import { socketConnect } from '../actions/index';
import { connect } from 'react-redux';

class LNConnectContainer extends React.Component {
  constructor() {
      super();
    }

  componentWillMount() {
    const connected_socket = io("http://localhost:3001");

      connected_socket.on("CONNECT_SUCCESS", function(data){
        console.log("here");
        alert("Node is connected!")
        window.location.hash = '/main';
      });

      connected_socket.on("CONNECT_FAILURE", function(data){
        console.log("here");
        alert("Failure!")
      });

    this.props.onSocketConnect(connected_socket);
  }

  clickHandler() {
    this.props.socket.emit("CONNECT");
  }

  render() {
    return (
      <LNConnect clickHandler={this.clickHandler.bind(this)}/>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    socket: state.socket
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSocketConnect: (socket) => dispatch(socketConnect(socket)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LNConnectContainer);
