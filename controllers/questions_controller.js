const mongoose = require('../db/mongoose')
const {Question} = require('../models/question')

module.exports = (app) =>{
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
}
