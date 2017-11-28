import { combineReducers } from 'redux';

import socketReducer from './socketReducer';
import rootReducer from './rootReducer';
import channelReducer from './channelReducer';
import gameStateReducer from './gameStateReducer';
import userStateReducer from './userStateReducer';

const indexReducer = combineReducers({
  socket: socketReducer,
  channel: channelReducer,
  gameState: gameStateReducer,
  userState: userStateReducer,
  rootReducer
});

export default indexReducer;
