const express = require('express')
const config = require('./config')
const setUpWebSocket = require('./services/websocket')
const enableWs = require('express-ws')
const mongoose = require('mongoose')
mongoose.models = {}

const app = express()

mongoose.connect('mongodb://study.test/study')
const models = require('./models')

//test code
const User = new mongoose.models.user({email: "test@test.com", username: "me", password:"passingwords!"})
User.save((err) => {if (err) {console.log(err)}})


enableWs(app)
app.ws('/ws', setUpWebSocket)


app.listen(config.PORT, ()=> {
  console.log(`API server active on http://${config.DOMAIN}:${config.PORT}`)
})
