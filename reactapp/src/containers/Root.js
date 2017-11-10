import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import LNConnectContainer from './LNConnectContainer';
import LNMainPageContainer from './LNMainPageContainer'
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
