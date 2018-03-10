// models so mongoose knows hot to store data
const config = require('../config/keys')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
const _ = require('lodash')

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

// overwrites previously method to only retrun certain things
UserSchema.methods.toJSON = function(){
  let user = this
  let userObject = user.toObject()
  return _.pick(user,['_id','name'])
}

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

UserSchema.statics.findByToken = function(token){
  let User = this
  let decoded;

  try{
   decoded = jwt.verify(token,config.secret)
  }catch (e){

  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token':token,
    'tokens.access':'auth'
  })
}

const User = mongoose.model('User', UserSchema)

module.exports = {User}
