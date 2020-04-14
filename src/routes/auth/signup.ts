import express from 'express'
const signUp = express.Router()
import authenticateToken from '../../middleware/authenticationToken'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../../models/userModel'
import RefreshTokenModal from '../../models/tokenModal'
import generateAccessToken from '../../middleware/generateAccessToken'

//@
signUp.post('/signup', async (req, res, next) => {
  const { password, username, email } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  const userModel = new UserModel({ username, password: hashedPassword, email })

  try {
    await userModel.save()
    const accessToken = await generateAccessToken(username)
    const refreshToken = await jwt.sign(username, process.env.ACCESS_TOKEN_SECRET)
    const token = new RefreshTokenModal({ token: refreshToken })
    await token.save()
    res.json({ accessToken, refreshToken }) //! sending to client token

  } catch (err) {
    res.json({ message: err })
  }
})

export default signUp