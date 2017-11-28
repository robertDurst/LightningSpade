// This file contains the landing page container. This deals with
// the logic that comes with the landing page component.
// This is probably the most complex container because it handles
// redirect upon connection of the node. It must send the user to
// the view according to the node's current state.

import React from 'react';
import ConnectView from '../components/ConnectView';
import io from 'socket.io-client';
import { socketConnect } from '../actions/index';
import { connect } from 'react-redux';

class ConnectViewContainer extends React.Component {
  componentDidMount() { this.props.onSocketConnect(io("http://localhost:3001")) }
  clickHandler() { this.props.socket.emit("CONNECT") }
  render() { return <ConnectView clickHandler={this.clickHandler.bind(this)}/> }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSocketConnect: (socket) => dispatch(socketConnect(socket)),
  };
};

const mapStateToProps = (state) => {
  return {
    socket: state.socket,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectViewContainer);
