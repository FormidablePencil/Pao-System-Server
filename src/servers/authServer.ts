import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
const port = 4001
import 'dotenv/config'

//routes
import refreshToken from '../routes/auth/refreshToken'
import signIn from '../routes/auth/signin'
import signUp from '../routes/auth/signup'
import signOut from '../routes/auth/signout'

mongoose.set('useCreateIndex', true);

const server = express()

server.use(cors())
server.use(express.json())

server.use('/auth', refreshToken)
server.use('/auth', signIn)
server.use('/auth', signUp)
server.use('/auth', signOut)

mongoose.connect(process.env.DENNIS, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('connected to db'))
mongoose.connection
  .once('open', () => console.log('connection to mongoDb successful'))
  .on('error', (err) => {
    console.log(err, 'err in connecting to mongoDb')
  })

server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
