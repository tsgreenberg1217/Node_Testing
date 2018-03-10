// models so mongoose knows hot to store data
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    unique: true
  },
  score: {
    type: Number,
    default: false
  },
  password:{
    type: String,
    required: true,
    minlength: 6
  },
  tokens:[{
    access: {
      type: String,
      required: true
    },
    token:{
      type: String,
      required: true
    }
  }]
})

const User = mongoose.model('User', UserSchema)

module.exports = {User}
