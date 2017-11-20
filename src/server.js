import express from 'express';
import {matchRoutes} from 'react-router-config'
import Routes from './client/Routes'
import renderer from './helpers/renderer';
import mongoose from 'mongoose'
import {createStore} from 'redux'
import reducers from './client/reducers'

import Model from './models'

const app = express();
import api from './api/routes'

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);

app.use(express.static('public'));
app.use('/api', api);

app.get('*', (req, res) => {
  const store = createStore(reducers, {});
  let promises = matchRoutes(Routes, req.path).filter(({route}) => {
    let model = route.dbInstance && route.dbInstance();
    return route.loadData ? route.loadData(Model[model]) : null;
  });
  Promise.all(promises).then((promise) => {
    if (promise.length) {
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
