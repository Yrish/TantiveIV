let mongoose = require('mongoose'), schema = mongoose.Schema

const notebook = new schema({
  //metadata: {typcreatedBy: {type: String, default: ""}, title: {type: String, default: "Untitled"}},
  metadata: {type: {
    createdBy: {type: String, default: ""},
    title: {type:String, default: "No Name"},
  }},
  readPermission: {type: Array, default: []},
  writePermission: {type: Array, default: []},
  modules: {type: [{
    name: String,
    contents: Object,
  }], default: []}
})

let model = mongoose.model('nootebook', notebook)

mongoose.models.notebook = model

module.exports = model
