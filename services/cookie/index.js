const config = require('../../config')
const types = require('../message/types')
const message = require('../message/message')

const expressSessionCookieConfig = {
  httpOnly: false,
  secure: false,
  domain: config.sessionDomain,
  maxAge: 24 * 60 * 60 * 1000,
}

function makeSessionCookie(sessionID) {
  return message.make(types.SET_COOKIE, {name: 'sessionID', value:sessionID})
}
module.exports = {expressSessionCookieConfig, makeSessionCookie}
