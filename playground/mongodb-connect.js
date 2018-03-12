const {mongoose} = require('../db/mongoose')
const {Question} = require('../models/question')
const {User} = require('../models/user')
const {Session} = require('../models/session')

const test = async function(){
  let qs = await Question.find()
  let q1 = qs[0]
  let newSession = new Session()
  newSession.results.push({question: q1})
  // console.log('saved question:',newSession.results[0].question)
  // newSession.results[0].correct = true
  // console.log('answered:', newSession.results[0])
  let s = await newSession.save()
}
test()
