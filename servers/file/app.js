const express = require('express')
const config = require('./config')

const app = express()

app.get('files/:filename', (req, res) => {
  res.send(`grabing file: ${req.props.filename}`)
})

app.listen(config.PORT, () => {
  console.log(`file server active on http://${config.DOMAIN}:${config.PORT}`)
})
