import mongoose from 'mongoose'
const Schema = mongoose.Schema

export interface PaoDocumentTypes {
  _id: any,
  number: { type: Number, unique: false }, //~ test if number must be unique
  person: String,
  action: String,
  object: String,
}

const PaoSchema = new Schema({
  username: { type: String, unique: true },
  list: [
    {
      _id: { type: String, unique: true },
      number: { type: Number, unique: false },
      person: String,
      action: String,
      object: String,
    }
  ]
})

const PaoModel = mongoose.model('PaoList', PaoSchema);
// const PaoDocumentModel = mongoose.model('', PaoDocumentSchema)

export { PaoModel }