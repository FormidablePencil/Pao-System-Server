import { PaoModel } from '../models/paoModel'
import { PutPaoDataReq } from '../types/paoTypes'

const checkIfDuplicated = async (req: any, res: any, next: any) => {
  let duplicates: boolean = false
  let filteredOutDiplicates: any = []
  req.existingPao.list.forEach((element: any) => {
    req.body.list.forEach((reqElement: any) => {
      if (reqElement.number === element.number) {
        duplicates = true
        filteredOutDiplicates = req.body.list.filter((cluster: any) => cluster.number !== element.number)
      }
    })
  })
  if (duplicates) return res.status(400).send('duplicate documents error')
  req.filteredOutDuplicates = filteredOutDiplicates
  next()
}

export default checkIfDuplicated