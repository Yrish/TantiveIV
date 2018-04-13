let mongoose = require('mongoose'), schema = mongoose.Schema

const user = new schema({
  email: String,
  username: String,
  password: String,
  notebook: {type: Array, default: []},
  creationTime: {type: Date, default: Date.now}
})

let model = mongoose.model('user', user)

mongoose.models.user = model

module.exports = model
