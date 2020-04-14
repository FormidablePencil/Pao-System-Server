import express, { Request } from 'express'
import authenticateToken from '../../middleware/authenticationToken'
import { PaoModel, PaoDocumentModel } from '../../models/paoModel'
const putItem = express.Router()

interface PutItemReq extends Request {
  username: string
  body: {
    id: number
    list: {
      number: string
      person: string
      action: string
      object: string
    }
  }
}

putItem.put('/:id', authenticateToken, async (req: PutItemReq, res) => {
  if (!req.params.id) return res.status(400).send('missing id feild')
  console.log(req.params.id)
  let paolist: any = await PaoModel.findOne({ username: req.username })
  const newDocument = new PaoDocumentModel({
    number: req.body.list.number,
    person: req.body.list.person,
    action: req.body.list.action,
    object: req.body.list.object
  })
  let updated = false
   paolist.list = paolist.list.map((document: any) => {
    if (document._id.toString() === req.params.id.toString()) {
      console.log('object')
      updated = true
      console.log(newDocument, 'newDocument')
      newDocument._id = document._id //this will work but id will be a string... is that fine?
      return newDocument
    } else return document
  })
  console.log(newDocument)
  // console.log(updatedCollection)
  if (updated) {
    try {
      await paolist.save()
      res.status(201).send('saved updated document')
    } catch (err) {
      res.json({ message: err })
    }
  } else {
    let alreadyExisting = false
    paolist.list.map((item: any) => {
      if (item.number === req.body.list.number) {
        alreadyExisting = true
      }
    })
    if (alreadyExisting) return res.status(400).send('Item with that number exists. Cannot push document to collection. If you want to update an item then "number" must correlate with req id')
    paolist.list.push(newDocument)
    // console.log(paolist)
    try {
      await paolist.save()
      res.status(201).send('pushed new document to collection and saved')
    } catch (err) {
      res.json({ message: err })
    }
  }
  // console.log(req.params.id, 'req.params.id')
  // console.log(req.body)
})

export default putItem