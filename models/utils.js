const mongoose = require('mongoose')

function getPublicData(user) {
  return {username: user.username, notebooks: user.notebooks}
}

function getNoteBookPublicData(notebook) {
  return {_id: notebook._id, title: notebook.title, createdBy: notebook.createdBy, modules: notebook.modules}
}
