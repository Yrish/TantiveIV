const message = require('./message')
const error = require('./error')
const types = require('./types')
const messageRouter = require('./router')

let HandleMessage = (mess, req, ws) => {
  console.log(mess)
  try {
    mess = JSON.parse(mess)
  } catch(err) {
    console.log(`[message] ERROR: NOT JSON: message could not read message: ${mess}`)
    console.log(mess)
    ws.send(message.makesendable(error.make('NOT_JSON', 'message was not JSON', mess)))
    return
  }
  if(!mess.type) {
    ws.send(message.makesendable(error.make('MISSING_TYPE', `'type' attribute of message was missing`, mess)))
    console.log(mess)
    return
  }
  let result = messageRouter.route(mess, req, ws)
  if(!result) {
    return
  }
  if (!result.type) {
    console.log(`[message] ERROR: MESSAGE MISSING TYPE:`)
    console.log(result)
  }
  ws.send(message.makesendable(result))
}

module.exports = {handle: HandleMessage}
