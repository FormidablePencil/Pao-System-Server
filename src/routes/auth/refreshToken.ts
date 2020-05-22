import express from 'express'
const refreshToken = express.Router()
import authenticateToken from '../../middleware/authenticationToken'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../../models/userModel'
import RefreshTokenModal from '../../models/tokenModal'
import generateAccessToken from '../../middleware/generateAccessToken'
import { TokenReq } from '../../types/authTypes'

refreshToken.post('/token', async (req: TokenReq, res) => {
  const refreshToken = req.body.token
  const tokenFromDb: any = await RefreshTokenModal.findOne({ token: refreshToken })
  if (tokenFromDb === null) return res.sendStatus(404)
  if (!refreshToken === tokenFromDb.token) return res.sendStatus(401)
  jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET, (err: any, username: any) => {
    if (err) return res.status(403).send({ message: 'refresh token invalid' })
    const accessToken = generateAccessToken({ name: username.name })
    res.json({ accessToken, refreshToken })
  })
})

export default refreshToken