let mongoose = require('mongoose'), schema = mongoose.Schema

const notebook = new schema({
  title: {type: String, default: "Untitled"},
  createdBy: {type: String, default: ""},
  readPermission: {type: Array, default: []},
  writePermission: {type: Array, default: []},
  modules: {type: Array, default: []}
})

let model = mongoose.model('nootebook', )

mongoose.models.notebook = model

module.exports = model
