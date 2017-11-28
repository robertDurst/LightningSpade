import React from 'react';
import { render } from 'react-dom';
import { configureStore, history, store } from './store/configureStore';
import Root from './containers/Root';


render(
    <Root store={store} history={history} />,
    document.getElementById('root')
);
