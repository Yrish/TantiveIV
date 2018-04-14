let mongoose = require('mongoose'), schema = mongoose.Schema

const notebook = new schema({
  metadata: {createdBy: {type: String, default: ""}, title: {type: String, default: "Untitled"}},
  readPermission: {type: Array, default: []},
  writePermission: {type: Array, default: []},
  modules: [{
    name: String,
    contents: Object,
  }],
})

let model = mongoose.model('nootebook', notebook)

mongoose.models.notebook = model

module.exports = model
