import express from 'express'
const signOut = express.Router()
import authenticateToken from '../../middleware/authenticationToken'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../../models/userModel'
import RefreshTokenModal from '../../models/tokenModal'
import { router_responses } from '../routerResponses'

signOut.delete('/signout', async (req, res) => { //deleteing the refresh token
  const deleteResult = await RefreshTokenModal.deleteOne({ token: req.body.token }, (err) => {
    if (err) return res.send(err)
  })
  if (deleteResult.deletedCount === 0) return res.status(404).send({ mesg: router_responses.signed_out_with_err })
  if (deleteResult.deletedCount > 0) return  res.status(200).send({ mesg: router_responses.signed_out_with_err })
  res.sendStatus(204) //successfully deleted token
})

export default signOut