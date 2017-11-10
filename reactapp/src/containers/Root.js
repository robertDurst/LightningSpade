import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import LNConnectContainer from './LNConnectContainer';
import LNMainPageContainer from './LNMainPageContainer'
import LNChannelPendingContainer from './LNChannelPendingContainer'
import PokerGameRoomContainer from './PokerGameRoomContainer'
import { HashRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default function Root({ store, history }) {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <HashRouter>
            <Switch>
              <Route exact path='/' render={()=><LNConnectContainer history={history}/>}/>
              <Route exact path='/main' render={()=><LNMainPageContainer history={history}/>}/>
              <Route exact path='/pendingchannel' render={()=><LNChannelPendingContainer history={history}/>}/>
              <Route exact path='/pokergameroom' render={()=><PokerGameRoomContainer history={history}/>}/>
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
