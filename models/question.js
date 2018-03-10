// models so mongoose knows hot to store data
const mongoose = require('mongoose')
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
    }]
  }
})

const Question = mongoose.model('Question', QuestionSchema)

module.exports = {Question}
