import express, { Request } from 'express'
import authenticateToken from '../../middleware/authenticationToken'
import { PaoModel } from '../../models/paoModel'
const updateItem = express.Router()

interface UpdateItemReq extends Request {
  username: string
  body: {
    number: string
    value: string
    name: string
  }
}

//~ handles two functions. Create & updates new document in that order
updateItem.put('/update/:id', authenticateToken, async (req: UpdateItemReq, res) => {
  console.log('hit')
  const { value, number, name } = req.body
  if (!req.params.id) return res.status(400).send({ message: 'missing id feild' })
  let paolist: any = await PaoModel.findOne({ username: req.username })
  if (!paolist) return res.status(404).send({ message: 'failed, no list existent under username', message2: `there is no existing list in ${req.username} exist` })
  let updated = false
  console.log(paolist)
  // paolist.list =
   paolist.list.forEach((document: any, index) => {
    // console.log(paolist.list[index][name], '?????????????????????????????///')
    if (document._id === req.params.id) {
      // return document[name] = value
      paolist.list[index][name] = value
      updated = true
      // return document
    }
    // } else return document
  })
  console.log(paolist, 'paolist')
  if (!updated) return res.send({ message: 'item searched by id does not exist' })
  try {
    await paolist.markModified('propChanged')
    await paolist.save() // works
    res.status(201).send({ message: 'saved updated document' })
  } catch (err) {
    console.log(err)
    res.json({ message: err })
  }
})

export default updateItem