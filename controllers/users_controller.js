const mongoose = require('../db/mongoose')
const {User} = require('../models/user')
const {authenticate} = require('../middleware/authenticate')

module.exports = (app) =>{
  app.get('/users/me', authenticate, (req,res) =>{
    res.header('x-auth',req.token).send(req.user)
  })

  app.post('/users', (req,res)=>{
    let user = new User({
      name: req.body.name,
      password: req.body.password,
    })
    user.save()
    .then(user => user.generateAuthToken())
    .then(token => res.header('x-auth', token).send(user))
    .catch(e => res.status(404).send(e))
  })

  app.post('/users/login', (req,res)=>{
    let e_user = {name: req.body.name, password:req.body.password}
    User.verifyCreds(e_user)
    .then(user => {
       user.generateAuthToken()
      .then(token => {res.header('x-auth', token).send(user)})
    })
    .catch(e=> {res.status(400).send(e)})
  })

}
