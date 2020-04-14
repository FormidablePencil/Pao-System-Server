import mongoose from 'mongoose'
const Schema = mongoose.Schema

const DeletedRecordsSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  list: {
    type: Array,
    required: true
  }
})

const DeletedRecordsModel = mongoose.model('deletedRecord', DeletedRecordsSchema)
export { DeletedRecordsModel }