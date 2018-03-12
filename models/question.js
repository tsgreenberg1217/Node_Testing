// models so mongoose knows hot to store data
const mongoose = require('mongoose')
const validator = require('validator')

const {Schema} = mongoose

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
    type: [{type: String}],
    validate:{
      validator: (value) => value.length === 3,
      message: 'You need exactly 3 choices.'
    }
  },
  learnLink:{
    type: String,
    default:null
  },
  gifLink:{
    type: String,
    default: null
  },
  info:{
    type: String,
    default: null
  }
})

const Question = mongoose.model('Question', QuestionSchema)

module.exports = {Question}
