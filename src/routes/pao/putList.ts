import express from 'express'
const postList = express.Router()

import authenticateToken from '../../middleware/authenticationToken';
import { PutPaoDataReq } from '../../types/paoTypes';
import { PaoModel } from '../../models/paoModel';

postList.put('/', authenticateToken, async (req: PutPaoDataReq, res) => {
  if (!req.body.list) return res.sendStatus(400)
    const paoList = new PaoModel({
      username: req.username,
      list: req.body.list
    })
  if (!paoList) return res.status(404).send('malformed')
  const foundCollection = await PaoModel.find({ username: req.username })
  if (foundCollection.length === 0) {
    try {
      await paoList.save()
      res.status(201).send('created new')
    } catch (err) {
      res.json({ message: err })
    }
  } else {
    try {
      await PaoModel.replaceOne({ "username": req.username }, { "username": req.username, "list": req.body.list })
      res.status(201).send('completely replaced')
    } catch (err) {
      res.json({ message: err })
    }
  }
})

export default postList