import express, { Request } from 'express'
import { PaoModel } from '../../models/paoModel'
import authenticateToken from '../../middleware/authenticationToken'
const deleteItem = express.Router()

interface DeleteItemReq extends Request {
  username: String
  params: {
    id: any
  }
}

deleteItem.delete('/:id', authenticateToken, async (req: DeleteItemReq, res) => {
  const pao: any = await PaoModel.findOne({ username: req.username })
  let itemToDeleteFound: boolean = false
  pao.list = pao.list.filter((item: any) => {
    if (item._id.toString() === req.params.id.toString()) {
      itemToDeleteFound = true
      return
    }
    return item
  })
  if (!itemToDeleteFound) return res.status(400).send({ message: 'requested item to be deleted was not found by id' })
  try {
    pao.save()
    res.status(200).send({ message: `deleted item from ${req.username}'s list successfully` })
  } catch (error) {
    res.json({ message: error })
  }
})

export default deleteItem