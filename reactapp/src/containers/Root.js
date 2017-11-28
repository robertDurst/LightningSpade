import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import ConnectViewContainer from './ConnectViewContainer';
import AccountViewContainer from './AccountViewContainer'
import ChannelPendingViewContainer from './ChannelPendingViewContainer'
import PokerGameRoomViewContainer from './PokerGameRoomViewContainer'
import { HashRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default function Root({ store, history }) {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <HashRouter>
            <Switch>
              <Route exact path='/' render={()=><ConnectViewContainer history={history}/>}/>
              <Route exact path='/main' render={()=><AccountViewContainer history={history}/>}/>
              <Route exact path='/pendingchannel' render={()=><ChannelPendingViewContainer history={history}/>}/>
              <Route exact path='/pokergameroom' render={()=><PokerGameRoomViewContainer history={history}/>}/>
            </Switch>
          </HashRouter>
        </MuiThemeProvider>
      </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};
