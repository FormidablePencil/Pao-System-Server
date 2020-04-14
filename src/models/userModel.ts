import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  email: {
    type: String,
    unique: true,
    required: true
  }
})

const UserModel = mongoose.model('user', UserSchema)

export { UserModel }