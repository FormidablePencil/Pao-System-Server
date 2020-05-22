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
  if (pao === null) return res.status(404).send({message: `list does not exist under ${req.username} account`})
  res.json({ pao })
}) 

export default getList