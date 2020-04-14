import jwt from 'jsonwebtoken'

const generateAccessToken = (username: any) => {
  return jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' }) //encrypted username 
}
export default generateAccessToken
