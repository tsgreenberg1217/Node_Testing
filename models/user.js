// models so mongoose knows hot to store data
const config = require('../config/keys')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
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

UserSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

//this is an instance method
UserSchema.methods.generateAuthToken = function(){
  // this lets you get the contex of the function, so the instance in this case
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

  try{decoded = jwt.verify(token,config.secret)}
  catch (e){return new Promise((resolve,reject) =>{reject()})
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token':token,
    'tokens.access':'auth'
  })
}

UserSchema.statics.verifyCreds = function(entered_user){
  let User = this
  return User.findOne({'name': entered_user.name})
  .then((user) =>{
    if(!user){return Promise.reject()}
    return bcrypt.compare(entered_user.password, user.password)
    .then(res => {return res ? user : Promise.reject()})
  })
}

const User = mongoose.model('User', UserSchema)

module.exports = {User}
