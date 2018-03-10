// models so mongoose knows hot to store data
const config = require('../config/keys')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    unique: true
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

//this is an instance method
UserSchema.methods.generateAuthToken = function(){
  // i think this allows you to get the user form anywhere
  let user = this
  const access = 'auth'
  const token = jwt.sign({_id: user._id.toHexString(), access},config.secret)
  user.tokens.push({access,token})

  return user.save()
  .then(() => token)
  .catch((e) => e)
}

const User = mongoose.model('User', UserSchema)

module.exports = {User}
