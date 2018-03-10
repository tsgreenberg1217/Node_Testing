// models so mongoose knows hot to store data
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  score: {
    type: Number,
    default: false
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = {User}
