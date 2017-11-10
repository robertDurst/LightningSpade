import * as types from '../actions/types';

const socketReducer = (state = "", action) => {
  switch (action.type) {
    case types.SOCKET_CONNECT:
      return action.socket;
    case types.SOCKET_DISCONNECT:
      return "";
    default:
      return state;
  }
};

export default socketReducer;
