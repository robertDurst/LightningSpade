import { combineReducers } from 'redux';

import socketReducer from './socketReducer';
import rootReducer from './rootReducer';
import channelReducer from './channelReducer';
import gameStateReducer from './gameStateReducer';

const indexReducer = combineReducers({
  socket: socketReducer,
  channel: channelReducer,
  gameState: gameStateReducer,
  rootReducer
});

export default indexReducer;
