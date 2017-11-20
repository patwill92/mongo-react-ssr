import express from 'express'

import Model from '../models'

const router = express.Router();

router.get('/items', (req, res) => {
  let {Item} = Model;
  Item
    .find({})
    .then((doc) => {
      res.send(doc)
    })
});

export default router;