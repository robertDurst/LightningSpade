// This reducer keeps track of the game state object.

import * as types from '../actions/types';

const gameStateReducer = (state = [], action) => {
  switch (action.type) {
    case types.CHANNEL_CONNECT:
      return action.gameState;
    case types.CHANNEL_DISCONNECT:
      return [];
    case types.GAME_STATE_UPDATE:
      return action.gameState;
    default:
      return state;
  }
};

export default gameStateReducer;
