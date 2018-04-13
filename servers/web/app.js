const express = require('express')
const config = require('./config')

const app = express()

app.get('/', (req, res) => {
  res.send("Home")
})

app.listen(config.PORT, (req, res) => {
  console.log(`file server active on http://${config.DOMAIN}:${config.PORT}`)
})
