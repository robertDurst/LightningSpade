import * as types from '../actions/types';

const userStateReducer = (state = {
  peers: [],
  balance: 'Loading...'
}, action) => {
  switch (action.type) {
    case types.PEERS_UPDATE:
      var newState = {};
      newState.peers = action.peers;
      newState.balance = state.balance;
      return newState;
    case types.BALANCE_UPDATE:
      var newState = {};
      newState.peers = state.peers;
      newState.balance = action.balance;
      return newState;
    default:
      return state;
  }
};

export default userStateReducer;
