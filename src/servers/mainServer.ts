import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
const port = 8000
import 'dotenv/config'
import getList from '../routes/pao/getList'
import putList from '../routes/pao/putList'
import putItem from '../routes/pao/putItem'
import deleteItem from '../routes/pao/deleteItem'
import deleteUserAccount from '../routes/pao/deleteUserAccount'


mongoose.set('useCreateIndex', true);

const server = express()

server.use(cors())
server.use(express.json())

server.use('/lists', getList, putList, putItem, deleteItem)
server.use('/', deleteUserAccount)

mongoose.connect(process.env.DENNIS, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('connected to db'))
mongoose.connection
  .once('open', () => console.log('connection to mongoDb successful'))
  .on('error', (err) => {
    console.log(err, 'err in connecting to mongoDb')
  })

server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
