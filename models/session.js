const mongoose = require('mongoose')
const {Schema} = mongoose

var resultSchema = new Schema({
    question: {type: Schema.Types.ObjectId},
    result:{type: Boolean}
},{ _id : false });

const SessionSchema = new Schema({
  results:[resultSchema]
})

const Session = mongoose.model('Session', SessionSchema)

module.exports = {Session}
