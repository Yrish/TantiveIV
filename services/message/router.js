const types = require('./types')
const error = require('./error')
const accountManager = require('../../accounts')

let router = {
  [types.ERROR]: (message, ws) => console.log(`[message] INCOMING ERROR: ${error.type}: ${error.reason}: ${error.data}`),
  [types.GET_USER]: (message, ws) => console.log('[message] GRABING USER'),
  [types.PRINT]: (message, ws) => console.log(`[message] print message PRINT: ${message.payload}`),
  [types.LOGIN]: (message, ws) => accountManager.login(message.payload.username, message.payload.password, ws),
  [types.REGISTER] : (message, ws) => accountManager.register(message.payload, ws),
}

let route = (message, ws) => {
  let linked = router[message.type]
  if(!linked) {
    return error.make("BAD_TYPE", `There is no type ${message.type}`, message)
  }
  return linked(message, ws)
}


module.exports = {route}
