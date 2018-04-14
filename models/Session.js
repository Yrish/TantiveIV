let mongoose = require('mongoose'), schema = mongoose.Schema

const session = new schema({
  userID: String,
})

let model = mongoose.model('session', session)

mongoose.models.session = model

module.exports = model
