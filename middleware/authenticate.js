const mongoose = require('mongoose')
const {User} = require('../models/user')



const authenticate = (req,res,next)  =>{
  console.log(req.header('x-auth'))
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWE1OGU4NGU1MGExNzJhODY5NDJlZjYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTIwODAxNzIxfQ.OCZrooZEhwEaaz8YhLQqEDO5T_qUg20v7xhYaF_fNio'
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
