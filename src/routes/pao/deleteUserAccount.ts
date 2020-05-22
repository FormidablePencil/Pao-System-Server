import express, { Request } from 'express'
import authenticateToken from '../../middleware/authenticationToken'
import { PaoModel } from '../../models/paoModel'
import { UserModel } from '../../models/userModel'
import RefreshTokenModal from '../../models/tokenModal'
import { DeletedRecordsModel } from '../../models/deletedRecords'
import bcrypt from 'bcrypt'
const deleteUserAccount = express.Router()

interface ReqTypes extends Request {
  username: string
  password: string
  body: {
    username: string
    password: string
    email: string
    token: string
  }
}

//this api call works but it returns ugly messages for now
//@ will comeback to this api once had more exp with it in other projects
deleteUserAccount.delete('/deleteaccount', authenticateToken, async (req: ReqTypes, res, next) => {

  console.log(req.username, 'req.username')
  if (!req.body.password || !req.body.username || !req.body.token) return res.status(400).send({ message: 'all required data not given' })
  console.log(req.username, 'req.usernamereq.username')
  const userInfo: any = await UserModel.findOne({ username: req.username }, (err) => returnErr(err, res, next))
  if (userInfo === null) return res.status(404).send({ message: "user does not exist" })
  if (await bcrypt.compare(req.body.password, userInfo.password) === false &&
    req.body.email === userInfo.email) return res.status(404).send({ message: 'something went wrong' })
  const paoData: any = await PaoModel.findOne({ username: req.username }, (err) => returnErr(err, res, next))
  console.log(paoData, 'paoDatapaoDatapaoData')
  let deletedRecord
  if (paoData !== null) {
    deletedRecord = await new DeletedRecordsModel({
      username: paoData.username,
      list: paoData.list
    })
  }
  console.log('checkpoint')
  try {
    await RefreshTokenModal.deleteOne({ token: req.body.token }, (err) => {
      console.log('#################')
      returnErr(err, res, next)
    })
    await PaoModel.deleteOne({ username: req.username }, (err) => {
      console.log('do absolute nothing')
    })
    await UserModel.deleteOne({ username: req.username }, (err) => returnErr(err, res, next))
    if (deletedRecord) deletedRecord.save()
    return res.status(200).send({message: `successfully deleted ${req.username}'s account`})
  } catch (error) {
    console.log('@@@@@@@@@@@@@@@@@@@')
    return res.json({ message: error })
  }
})

const returnErr = (err: any, res: any, next: any) => {
  console.log('do absolute nothing')
  if (err) return res.json({ message: err })
  next()
}

export default deleteUserAccount

  //~ just like the client holds on to token token it also holds onto refresh token but instead of passing it into head it's passed into req.body