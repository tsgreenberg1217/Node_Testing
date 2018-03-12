const {mongoose} = require('../db/mongoose')
const {Question} = require('../models/question')
const {User} = require('../models/user')
const {Session} = require('../models/session')


// function for inserting into subarray
const test = async function(){
  let qs = await Question.find()
  let q1 = qs[0]
  let newSession = new Session()
  // start new game
  newSession.results.push({question: q1})
  // when they answer
  newSession.results[0].result = true
  console.log(newSession.results[0])
  let s = await newSession.save()
}
test()
