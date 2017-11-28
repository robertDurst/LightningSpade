// This file contains the channel pending container. This deals with
// the logic that comes with the channel pending component.

import React from 'react';
import ChannelPendingView from '../components/ChannelPendingView';
import { connect } from 'react-redux';
import { channelConnect, channelDisconnect } from '../actions/index';

class ChannelPendingViewContainer extends React.Component {
  componentDidMount() { if(!this.props.socket) window.location.hash = '/' }
  render() { return <ChannelPendingView /> }
};

const mapStateToProps = (state) => {
  return {
    socket: state.socket
  }
};


export default connect(mapStateToProps, null)(ChannelPendingViewContainer);
