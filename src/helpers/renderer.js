import React from 'react';
import {renderToString} from 'react-dom/server'
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router-dom'
import serialize from 'serialize-javascript'
import {JssProvider, SheetsRegistry} from 'react-jss'
import {create} from 'jss';
import preset from 'jss-preset-default'
import createGenerateClassName from 'material-ui/styles/createGenerateClassName'
import {renderRoutes} from 'react-router-config'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'
import {green, red} from 'material-ui/colors'


import Routes from '../client/Routes'

export default (req, store, context) => {
  const jss = create(preset());
  jss.options.createGenerateClassName = createGenerateClassName;
  const sheets = new SheetsRegistry();
  const theme = createMuiTheme({
    palette: {
      primary: green,
      accent: red,
      type: 'light',
    },
  });
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <JssProvider jss={jss} registry={sheets}>
          <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
            {renderRoutes(Routes)}
          </MuiThemeProvider>
        </JssProvider>
      </StaticRouter>
    </Provider>
  );


  return `
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <style type="text/css" id="server-side-styles">
          ${sheets.toString()}
        </style>
      </head>
      <body>
        <div id="root">${content}</div>
        <script >
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
};
