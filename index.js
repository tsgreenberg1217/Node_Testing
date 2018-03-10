
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('./db/mongoose')
const {Todo} = require('./models/todo')

// Middleware
// req.body will be from body parser
app.use(bodyParser.json())

app.get('/todos',(req,res)=>{
  Todo.find().then((todos) => {
    res.send({todos})
  }, (e)=>{
    res.status(400).send(e)
  })
})

app.post('/todos', (req,res)=>{
  let todo = new Todo({
    text: req.body.text
  })
  todo.save().then((todo)=>{
    res.send(todo)
  },(e)=>{
    res.status(400).send(e)
  })
})

app.listen(3000,()=>{
  console.log('server up and running')
})
