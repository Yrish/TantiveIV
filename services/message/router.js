const types = require('./types')
const error = require('./error')

let router = {
  [types.ERROR]: (message) => console.log(`[message] INCOMING ERROR: ${error.type}: ${error.reason}: ${error.data}`),
  [types.GET_USER]: (message) => console.log('[message] GRABING USER')
}

let route = (message) => {
  let linked = router[message.type]
  if(!linked) {
    return error.make("BAD_TYPE", `There is no type ${message.type}`, message)
  }
  return linked(message)
}


module.exports = {route}
