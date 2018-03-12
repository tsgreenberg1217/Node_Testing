
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('./db/mongoose')
const port = process.env.PORT || 5000

// enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Middleware
// req.body will be from body parser
app.use(bodyParser.json())

require('./controllers/users_controller')(app)
require('./controllers/questions_controller')(app)


app.listen(port,()=>{
  console.log('server up and running')
})
