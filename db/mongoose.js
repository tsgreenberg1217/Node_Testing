const mongoose = require('mongoose')
const local = 'mongodb://localhost:27017/EFT'

// telling mongoose which promise library to use
mongoose.Promise = global.Promise
// commands wait for connection before they make querys
mongoose.connect(process.env.MONGODB_URI || local)

module.exports = {mongoose}
