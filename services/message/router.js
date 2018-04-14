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
  [types.GET_NOTEBOOKS]: (message, req, ws) => functions.getNotebooks(message, ws),
  [types.SET_NOTEBOOK]: (message, req, ws) => functions.setNotebook(message, ws),
  [types.LOGOUT]: (message, req, ws) => accountManager.logout(ws),
  [types.CREATE_NOTEBOOK]: (message, req, ws) => functions.createNotebook(message, ws),
}

let route = (message, req, ws) => {
  let linked = router[message.type]
  if(!linked) {
    return error.make("BAD_TYPE", `There is no type ${message.type}`, message)
  }
  return linked(message, req, ws)
}


module.exports = {route}
