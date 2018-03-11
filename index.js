
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('./db/mongoose')
const {Question} = require('./models/question')
const {User} = require('./models/user')
const {authenticate} = require('./middleware/authenticate')
const port = process.env.PORT || 3000


// Middleware
// req.body will be from body parser
app.use(bodyParser.json())

app.get('/questions',(req,res)=>{
  Question.find().then((question) => {
    res.send({question})
  }, (e)=>{
    res.status(400).send(e)
  })
})

app.post('/questions', (req,res)=>{
  let question = new Question({
    prompt: req.body.prompt,
    answer: req.body.answer,
    choices: req.body.choices
  })
  question.save().then((question)=>{
    res.send(question)
  },(e)=>{
    res.status(400).send(e)
  })
})


app.get('/users/me', authenticate, (req,res) =>{
  res.send(req.user)
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
  User.checkPassword(e_user)
  .then(user => {res.send(user)})
  .catch(e=> {
    console.log(e)
    res.status(400).send(e)
  })
})

app.listen(port,()=>{
  console.log('server up and running')
})
