import express from 'express'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const RefreshTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true
  }
})

const RefreshTokenModal = mongoose.model('token', RefreshTokenSchema)
export default RefreshTokenModal