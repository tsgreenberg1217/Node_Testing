const mongoose = require('mongoose')
const {Schema} = mongoose

var subSchema = mongoose.Schema({
    //your subschema content
},{ _id : false });

const SessionSchema = new Schema({
  results:[
    {
      question:{
      type: Schema.Types.ObjectId, ref: 'Question'
    }
  }
  ]
})

const Session = mongoose.model('Session', SessionSchema)

module.exports = {Session}
