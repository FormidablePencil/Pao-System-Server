import { PaoModel } from '../models/paoModel'
import { PutPaoDataReq } from '../types/paoTypes'

const createIfNotExistent = async (req: PutPaoDataReq, res: any, next: any) => {
  //@ pointless. we will update the whole pao list
  const existingPao: any = await PaoModel.findOne({ username: req.username })
  if (!existingPao) {
    const newPao = new PaoModel({
      username: req.username,
      list: req.filteredDuplicates
    }) //~ we will allow the client to save multiple of the same values but the frontend through redux will notify there's a duplicate
    console.log(newPao)
    if (newPao === null) return res.sendStatus(401)
    try {
      // if (newPao) await newPao.save()
      res.sendStatus(201)
    } catch (err) {
      res.json({ message: err })
    }
  } else {
    req.existingPao = existingPao
    next()
  }
}

export default createIfNotExistent