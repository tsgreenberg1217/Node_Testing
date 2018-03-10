
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('./db/mongoose')
const {Question} = require('./models/question')
const {User} = require('./models/user')


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

app.listen(3000,()=>{
  console.log('server up and running')
})
