import express from 'express'
const singIn = express.Router()
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../../models/userModel'
import RefreshTokenModal from '../../models/tokenModal'
import generateAccessToken from '../../middleware/generateAccessToken'
import { router_responses } from '../routerResponses'



singIn.post('/signin', async (req, res) => { //as long as the clinet has the refresh token it can sign in
  const { password, username, email } = req.body
  const userInfo: any = await UserModel.findOne({ username })
  if (userInfo === null) return res.status(401).send({message: router_responses.invalid_credentials})
  try {
    if (await bcrypt.compare(password, userInfo.password) === false &&
    email === userInfo.email === false) return res.status(404).send({message: router_responses.invalid_credentials})
    const accessToken = await generateAccessToken(req.body.username)
    const refreshToken = await jwt.sign(req.body.username, process.env.ACCESS_TOKEN_SECRET) //replace with generated RefreshToken
    await RefreshTokenModal.deleteOne({ token: refreshToken })
    const token = new RefreshTokenModal({ token: refreshToken })
    console.log(token, 'refreshToken')
    await token.save()
    res.json({ accessToken, refreshToken, message: 'heres some tokens' }) //! sending to client token
  } catch (err) {
    res.json({ message: err })
  }
  // compare passowrds with mongoDb's
  // if successful then return accessToken & refreshToken
})

export default singIn