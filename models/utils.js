const mongoose = require('mongoose')

function getPublicData(user) {
  return {username: user.username, notebooks: user.notebooks}
}

function getPersonalData(user) {
  return {username: user.username, notebooks: ueser.notebooks, email:user.email}
}

function getNoteBookPublicData(notebook) {
  return {_id: notebook._id, title: notebook.title, createdBy: notebook.createdBy, modules: notebook.modules}
}

module.exports = {getPublicData, getPersonalData, getNoteBookPublicData}
