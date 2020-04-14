import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PaoDocumentSchema = new Schema({
  number: { type: Number, unique: true }, //~ test if number must be unique
  person: String,
  action: String,
  object: String,
})

const PaoSchema = new Schema({
  username: { type: String, unique: true },
  list: [PaoDocumentSchema]
})

const PaoModel = mongoose.model('PaoList', PaoSchema);
const PaoDocumentModel = mongoose.model('', PaoDocumentSchema)

export { PaoModel, PaoDocumentModel }