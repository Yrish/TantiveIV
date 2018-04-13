const express = require('express')
const config = require('./config')

const app = express()

app.get('/', (req, res) => {
  res.send("Home")
})

app.listen(config.PORT, (req, res) => {
  console.log(`web server active on http://${config.DOMAIN}:${config.PORT}`)
})
