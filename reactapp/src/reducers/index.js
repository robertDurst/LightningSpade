import { combineReducers } from 'redux';

import socketReducer from './socketReducer'
import rootReducer from './rootReducer'
import channelReducer from './channelReducer'

const indexReducer = combineReducers({
  socket: socketReducer,
  channel: channelReducer,
  rootReducer
});

export default indexReducer;
