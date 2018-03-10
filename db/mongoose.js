const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/TodoApp'

// telling mongoose which promise library to use
mongoose.Promise = global.Promise
// commands wait for connection before they make querys
mongoose.connect(url)

module.exports = {mongoose}
