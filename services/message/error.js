const types = require('./types')
const message = require('./message')

let make = (errortype, reason = "unknown", data = 'None') => {
  return message.make(types.ERROR, {type: errortype, reason, data})
}

let makeAccountError = (errortype, reason = "unknown", data = 'None') => {
  return message.make(types.ACCOUNT_ERROR, {type: errortype, reason, data})
}

module.exports = {make, makeAccountError}
