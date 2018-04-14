const types = require('./types')
const error = require('./error')
const accountManager = require('../../accounts')
const functions = require('./functions')

let router = {
  [types.ERROR]: (message, req, ws) => console.log(`[message] INCOMING ERROR: ${error.type}: ${error.reason}: ${error.data}`),
  [types.GET_USER]: (message, req, ws) => console.log('[message] GRABING USER'),
  [types.PRINT]: (message, req, ws) => console.log(`[message] print message PRINT: ${message.payload}`),
  [types.LOGIN]: (message, req, ws) => accountManager.login(message.payload.username, message.payload.password, req, ws),
  [types.REGISTER] : (message, req, ws) => accountManager.register(message.payload, req, ws),
  [types.GET_SESSION]: (message, req, ws) => functions.getSession(ws),
  [types.SET_SESSION]: (message, req, ws) => functions.setSession(message, ws),
}

let route = (message, req, ws) => {
  let linked = router[message.type]
  if(!linked) {
    return error.make("BAD_TYPE", `There is no type ${message.type}`, message)
  }
  return linked(message, req, ws)
}


module.exports = {route}
