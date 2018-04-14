const mongoose = require('mongoose')

function getPublicData(user) {
  return {username: user.username, notebooks: user.notebooks, _id:user._id}
}

function getPersonalData(user) {
  return {username: user.username, notebooks: user.notebooks, email:user.email, _id:user._id}
}

function getNoteBookPublicData(notebook) {
  return {_id: notebook._id, title: notebook.title, createdBy: notebook.createdBy, modules: notebook.modules}
}

function getNoteBookPersonalData(notebook) {
  return{_id: notebook._id, title: notebook.title, createdBy: notebook.createdBy, modules: notebook.modules, readPermission: notebook.readPermission, writePermission: notebook.writePermission}
}

module.exports = {getPublicData, getPersonalData, getNoteBookPublicData}
