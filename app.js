const express = require('express')
const config = require('./config')
const setupWebSockets = require('./services/websocket')

const app = express()

setupWebSockets(app)

app.listen(config.PORT, ()=> {
  console.log(`API server active on http://${config.DOMAIN}:${config.PORT}`)
})
