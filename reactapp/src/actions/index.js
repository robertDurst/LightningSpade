import * as types from './types';

export function socketConnect(socket) {
  return {
    type: types.SOCKET_CONNECT,
    socket,
  };
}

export function socketDisconnect() {
  return {
    type: types.SOCKET_DISCONNECT,
  };
}

export function channelConnect(channel) {
  return {
    type: types.CHANNEL_CONNECT,
    channel
  };
}

export function channelDisconnect() {
  return {
    type: types.CHANNEL_DISCONNECT,
  };
}
