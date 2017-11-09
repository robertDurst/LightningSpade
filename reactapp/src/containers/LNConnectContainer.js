import React from 'react';
import LNConnect from '../components/LNConnect';
import io from 'socket.io-client';

class LNConnectContainer extends React.Component {
  constructor() {
      super();
      const socket = io("http://localhost:3001");
      this.state = {
        socket
      }

      this.state.socket.on("CONNECT_SUCCESS", function(data){
        alert("Node is connected!")
      });

      this.state.socket.on("CONNECT_FAILURE", function(data){
        alert("Failure!")
      });
    }

  clickHandler() {
    this.state.socket.emit("CONNECT");
  }

  render() {
    return (
      <LNConnect clickHandler={this.clickHandler.bind(this)}/>
    );
  }
};

export default LNConnectContainer;
