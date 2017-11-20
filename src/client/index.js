process.env.NODE_ENV = 'production';
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'
import { green, red } from 'material-ui/colors'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {Provider} from 'react-redux'

import Routes from './Routes'
import reducers from './reducers'

const theme = createMuiTheme({
  palette: {
    primary: green,
    accent: red,
    type: 'light',
  },
});

const store = createStore(
  reducers, window.INITIAL_STATE,
  applyMiddleware(thunk, logger)
);


ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        {renderRoutes(Routes)}
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
