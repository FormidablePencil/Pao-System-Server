import express, { Request } from 'express'
const getList = express.Router()
import { PaoModel } from '../../models/paoModel';
import authenticateToken from '../../middleware/authenticationToken';

export interface GetPaoListsReq extends Request {
  username: string // or any other type
}

getList.get('/', authenticateToken, async (req: GetPaoListsReq, res) => {
  console.log(req.username)
  const pao = await PaoModel.findOne({ username: req.username })
  console.log(pao, 'pao')
  if (pao === null) return res.sendStatus(404)
  res.json({ pao })
}) 

export default getList