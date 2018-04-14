const MessageCreator = require('./message')
const types = require('./types')
const cookie = require('../cookie')
const mongoose = require('mongoose')
const error = require('./error')
const modelUtils = require('../../models/utils')

function getSession(ws) {
  if (ws.sessionID && ws.session) {
    ws.send(MessageCreator.makesendable(cookie.makeSessionCookie(ws.session._id)))
    ws.sessionID = ws.session._id
    return
  }
  let session = new mongoose.models.session()
  ws.session = session
  ws.sessionID = session._id
  session.save()
  ws.send(MessageCreator.makesendable(cookie.makeSessionCookie(ws.session._id)))
}

function setSession(message, ws) {
  let sessionID = message.payload.sessionID
  if (!sessionID) {
    ws.send(MessageCreator.makesendable(error.make("NO_SESSION", "No session was sent for type: 'SET_SESSION'", message)))
  }
  let session = mongoose.models.session.findOne({_id: sessionID}, (err, session) => {
    if(err) {
      console.error(`[socket][setSession] ERROR`)
      console.log(err)
    }
    if (session) {
      ws.session = session
      ws.sessionID = session._id
      console.log(`[socket] set session to ${session._id}`)
      if (session.userID) {
        mongoose.models.user.findOne({_id: session.userID}, (err, acc) => {
          if (err) {
            return
          }
          if (!acc) {
            return
          }
          ws.user = acc
          let user = modelUtils.getPersonalData(acc)
          ws.send(MessageCreator.makesendable(MessageCreator.make(types.LOG_IN_SUCCESSFULL,{user})))
        })
      }
      return
    }
    console.log(`[socket] Session ${sessionID}: was recieved but was not found in the data base, a new one is created`)
    getSession(ws)
  })
}

function getNotebooks (message, ws) {
  let userID
  if (message.payload) {
    userID = message.payload.userID
  }
  if (!userID) {
    if (!ws.user) {
      ws.send(MessageCreator.makesendable(error.make("USER_ERROR", "no user (userID) given and not logged in, must supply at least one for 'getNotebooks' to work", message)))
      return
    }
    userID = ws.user._id
  }
  mongoose.models.user.findOne({id: userID}, (err, account) => {
    if(err) {
      ws.send(MessageCreator.makesendable(error.make("SERVER_ERROR", "A problem happened in the server", err)))
      return
    }
    if(!account) {
      ws.send(MessageCreator.makesendable(error.make("USER_ERROR", `no user was found with id '${userID}'`)))
      return
    }
    let notebooks = account.notebooks
    mongoose.models.notebook.find({'_id': { $in: notebooks}}, (err, notebooks) => {
      if (err) {
        ws.send(MessageCreator.makesendable(error.make("SERVER_ERROR", "A problem happened in the server", err)))
        return
      }
      let sendableNotebooks = []
      for (let notebook of notebooks) {
        sendableNotebooks.push(modelUtils.getNoteBookPublicData(notebook))
      }
      ws.send(MessageCreator.makesendable(MessageCreator.make(types.SET_NOTEBOOKS, {notebooks: sendableNotebooks})))
    })
  })
}

function setNotebook(message, ws) {
  if (!message.payload || !message.payload.notebook) {
    ws.send(MessageCreator.makesendable(error.make("NOTEBOOK_ERROR", "payload.notebook must exist in message 'SET_NOTEBOOK'", message)))
  }
  let notebookID = message.payload.notebook._id
  if (!notebookID) {
    ws.send(MessageCreator.makesendable(error.make("NOTEBOOK_ERROR", "payload.notebook is missing attribute _id")))
  }
  mongoose.models.notebook.findOne({_id: notebookID}, (err, notebook) => {
    if (err) {
      ws.send(MessageCreator.makesendable(error.make("SERVER_ERROR", "A problem happened in the server", err)))
      return
    }
    if (!ws.user) {
      ws.send(MessageCreator.makesendable(error.make("NOTEBOOK_ERROR", `can not edit notebook when not signed in`)))
    }
    if (!notebook) {
      ws.send(MessageCreator.makesendable(error.make("NOTEBOOK_ERROR", `no notebook exists with id: '${notebookID}'`)))
    }
  })
}

module.exports = {getSession, setSession, getNotebooks, setNotebook}
