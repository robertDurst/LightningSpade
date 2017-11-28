// This file contains action definitions

import * as types from './types';

// Called upon socket connection
// Input: socket object
export function socketConnect(socket) {
  return {
    type: types.SOCKET_CONNECT,
    socket,
  };
}

// Called upon socket disconnection
// Input: NONE
export function socketDisconnect() {
  return {
    type: types.SOCKET_DISCONNECT,
  };
}

// Called upon channel connection
// Input: channel object and game state object
export function channelConnect(channel, gameState) {
  return {
    type: types.CHANNEL_CONNECT,
    channel,
    gameState
  };
}

// Called upon channel pending
// Input: channel object
// TODO: include whether closing or opening
export function channelPending(channel) {
  return {
    type: types.CHANNEL_PENDING,
    channel
  };
}

// Called upon channel disconnection
// Input: NONE
export function channelDisconnect() {
  return {
    type: types.CHANNEL_DISCONNECT,
  };
}

// Called upon peer update
// Input: peers
export function peersUpdate(peers) {
  return {
    type: types.PEERS_UPDATE,
    peers
  };
}

// Called upon balance update
// Input: balance
export function balanceUpdate(balance) {
  return {
    type: types.BALANCE_UPDATE,
    balance
  };
}
