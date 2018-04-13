const express = require('express')
const config = require('./config')

const app = express()

app.listen(config.PORT, ()=> {
  console.log(`file server active on http://${config.DOMAIN}:${config.PORT}`)
})
