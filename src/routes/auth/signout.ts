import express from 'express'
const signOut = express.Router()
import authenticateToken from '../../middleware/authenticationToken'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../../models/userModel'
import RefreshTokenModal from '../../models/tokenModal'

signOut.delete('/signout', (req, res) => { //deleteing the refresh token
console.log(req.body.token)
  RefreshTokenModal.deleteOne({ token: req.body.token }, (err) => {
    if (err) return res.send(err)
    console.log('11')
  })
  console.log('ww')
  res.sendStatus(204) //successfully deleted token
})

export default signOut