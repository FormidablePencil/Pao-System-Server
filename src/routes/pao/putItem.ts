import express, { Request } from 'express'
import authenticateToken from '../../middleware/authenticationToken'
import { PaoModel, PaoDocumentTypes } from '../../models/paoModel'
import { v4 as uuidv4 } from 'uuid';
const putItem = express.Router()

interface PutItemReq extends Request {
  username: string
  number: string
  person: string
  action: string
  object: string
}

putItem.put('/newdoc', authenticateToken, async (req: PutItemReq, res) => {
  console.log(req.body)
  // console.log('here')
  let paolist: any = await PaoModel.findOne({ username: req.username })
  // console.log(paolist, 'paolist.listpaolist.list')
  const newDocument: PaoDocumentTypes = {
    _id: uuidv4(),
    number: req.body.number,
    person: req.body.person,
    action: req.body.action,
    object: req.body.object
  }
  let alreadyExisting = false
  paolist.list.map((item: any) => {
    if (item.number === req.body.number) {
      alreadyExisting = true
    }
  })
  if (alreadyExisting) return res.status(400).send({ message: 'Document with that number exists.', message2: 'Cannot push document to collection. If you want to update an item then "number" must correlate with req id' })
  paolist.list.push(newDocument)
  try {
    await paolist.save()
    res.status(201).send({ message: 'pushed new document to collection and saved', document: newDocument })
  } catch (err) {
    // console.log(err)
    res.json({ message: err })
  }
})

export default putItem