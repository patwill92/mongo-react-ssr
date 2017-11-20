import express from 'express'

import Item from '../models/Item'

const router = express.Router();

router.get('/items', (req, res) => {
  Item
    .find({})
    .then((doc) => {
      res.send(doc)
    })
});

export default router;