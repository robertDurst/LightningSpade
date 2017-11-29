import * as types from '../actions/types';

const userStateReducer = (state = {
  peers: [],
  balance: 'Loading...',
  userInfo: [],
  state: 'watching',
}, action) => {
  switch (action.type) {
    case types.PEERS_UPDATE:
      var newState = {};
      newState.peers = action.peers;
      newState.balance = state.balance;
      newState.userInfo = state.userInfo;
      newState.state = state.state;
      return newState;
    case types.BALANCE_UPDATE:
      var newState = {};
      newState.peers = state.peers;
      newState.balance = action.balance;
      newState.userInfo = state.userInfo;
      newState.state = state.state;
      return newState;
   case types.USER_UPDATE:
     var newState = {};
     newState.peers = state.peers;
     newState.balance = state.balance;
     newState.userInfo = action.userInfo;
     newState.state = state.state;
     return newState;
   case types.GAME_STATE_UPDATE:
     if(state.state === 'watching' && action.gameState.state === 1 && action.gameState.playerContainer.players.filter( x => x.pubKey === state.userInfo.identity_pubkey)[0].hand.length) {
       var newState = {};
       newState.peers = state.peers;
       newState.balance = state.balance;
       newState.userInfo = state.userInfo;
       newState.state = 'playing';
       return newState;
     } else {
       return state;
     }
   case types.YOUR_TURN:
     var newState = {};
     newState.peers = state.peers;
     newState.balance = state.balance;
     newState.userInfo = state.userInfo;
     newState.state = 'betting';
     return newState;
   case types.MADE_MOVE:
     var newState = {};
     newState.peers = state.peers;
     newState.balance = state.balance;
     newState.userInfo = state.userInfo;
     newState.state = 'playing';
     return newState;
   default:
     return state;
  }
};

export default userStateReducer;
