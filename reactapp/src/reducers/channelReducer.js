// This reducer keeps track of the channel object of the game
// node that this node is currently connected with.

import * as types from '../actions/types';

const channelReducer = (state = "", action) => {
  switch (action.type) {
    case types.CHANNEL_CONNECT:
      return action.channel;
    case types.CHANNEL_DISCONNECT:
      return "";
    default:
      return state;
  }
};

export default channelReducer;
