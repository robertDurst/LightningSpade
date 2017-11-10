// import React from 'react';
// import ReactDOM from 'react-dom';
// import './stylesheets/index.css';
// import LNConnectContainer from './containers/LNConnectContainer';
// import LNMainPageContainer from './containers/LNMainPageContainer'
// import registerServiceWorker from './registerServiceWorker';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//
//
// ReactDOM.render(   <MuiThemeProvider>
//       <LNMainPageContainer />
//     </MuiThemeProvider>, document.getElementById('root'));
// registerServiceWorker();

import React from 'react';
import { render } from 'react-dom';
import { configureStore, history } from './store/configureStore';
import Root from './containers/Root';

const store = configureStore();

render(
    <Root store={store} history={history} />,
    document.getElementById('root')
);
