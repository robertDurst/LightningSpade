import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import LNConnectContainer from './containers/LNConnectContainer';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


ReactDOM.render(   <MuiThemeProvider>
      <LNConnectContainer />
    </MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
