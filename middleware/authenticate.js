const mongoose = require('mongoose')
const {User} = require('../models/user')



const authenticate = (req,res,next)  =>{
  // route wont run until next is called in middleware
  let token = req.header('x-auth')
  User.findByToken(token).then((user) =>{
    if(!user){return Promise.reject()}
    // modifies req object
    req.user = user
    req.token = token
    next()
  }).catch((err)=>{
    res.status(401).send(err)
  })
}

module.exports = {authenticate}
