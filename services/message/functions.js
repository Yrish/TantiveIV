const MessageCreator = require('./message')
const types = require('./types')
const cookie = require('../cookie')
const mongoose = require('mongoose')
const error = require('./error')

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
        mongoose.modles.user.findOne({_id: session.userID}, (err, acc) => {
          if (err) {
            return
          }
          if (!acc) {
            return
          }
          ws.user = acc
        })
      }
      return
    }
    console.log(`[socket] Session ${sessionID}: was recieved but was not found in the data base, a new one is created`)
    getSession(ws)
  })
}

module.exports = {getSession, setSession}
