// models so mongoose knows hot to store data
const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const QuestionSchema = new Schema({
  prompt: {
    type: String,
    required: true,
    trim: true
  },
  answer: {
    type: String,
    required: true,
  },
  choices: {
    type: [{
      type: String
    }],
    validate:{
      validator: (value) => value.count === 3,
      message: 'You need exactly 3 choices.'
    }
  }
})

const Question = mongoose.model('Question', QuestionSchema)

module.exports = {Question}
