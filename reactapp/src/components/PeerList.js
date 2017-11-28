// This file contains the Peer List Component for the Account View Component: AccountView.js

import React from 'react';
import '../stylesheets/AccountView.css';
import { Paper } from 'material-ui';

export default ({handleClick, peers}) => (
  <div className={'AccountView__peer_container'}>
    <div className={'AccountView__peerlist_content_container'}>
      <div className={'AccountView__peerlist_content'}>
        <Paper
          zDepth={4}
          className={'AccountView__peerlist'}
          >
            {
              peers.map( x => {
                  return (
                    <div
                      onClick={handleClick.bind(this, x)}
                      key={x.peer_id}
                      id={x.peer_id}
                      className={'AccountView__peerconnectionitem_container'}
                      >
                      <p className={'AccountView__peeriddisplay'}>Peer Id: {x.peer_id}</p>
                      <p className={'AccountView__pubkeydisplay'}>PubKey: {x.pub_key}</p>
                      <p className={'AccountView__ipaddressdisplay'}>Address: {x.address}</p>
                    </div>
                  )
              })
            }
        </Paper>
      </div>
      </div>
    </div>
);
