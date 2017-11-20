import express from 'express';
import {matchRoutes} from 'react-router-config'
import Routes from './client/Routes'
import renderer from './helpers/renderer';
import mongoose from 'mongoose'
import {createStore} from 'redux'
import reducers from './client/reducers'

import Item from './models/Item'

const app = express();
import api from './api/routes'

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ghostusers');

app.use(express.static('public'));
app.use('/api', api);

app.get('*', (req, res) => {
  const store = createStore(reducers, {});
  let promises = matchRoutes(Routes, req.path).map(async ({route}) => {
    return route.loadData ? await route.loadData(Item) : null;
  });
  Promise.all(promises).then((promise) => {
    if (promise[0]) {
      let {data, func} = promise[0];
      store.dispatch(func(data));
    }
    const context = {};
    const content = renderer(req, store, context);
    res.send(content);
  })
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
