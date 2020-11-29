import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'

//routes
import refreshToken from '../routes/auth/refreshToken'
import signIn from '../routes/auth/signin'
import signUp from '../routes/auth/signup'
import signOut from '../routes/auth/signout'

const port = process.env.PORT || process.env.MONGO_AUTH

mongoose.set('useCreateIndex', true);

const server = express()

server.use(cors())
server.use(express.json())

server.use('/auth', refreshToken)
server.use('/auth', signIn)
server.use('/auth', signUp)
server.use('/auth', signOut)

mongoose.connect(process.env.MONGO_AUTH, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('connected to db'))
mongoose.connection
  .once('open', () => console.log('connection to mongoDb successful'))
  .on('error', (err) => {
    console.log(err, 'err in connecting to mongoDb')
  })

server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
