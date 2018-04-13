const WebSocket = require('ws')
const config = require('../config')
const messageHandler = require('./message/handler')

/*
const setupWebSockets = (app) => {
  const wss = new WebSocket.Server(config.WEBSOCKETCONFIG)

  wss.on('connection', (ws) => {
    console.log('[websocket] opening')
    ws.on('message', (message) => {
      messageHandler.handle(messsage, ws)
    })

    ws.on('error', (err) => {
      console.log(`[websocket] ERROR: ${err}`)
    })

    ws.on('close', () => {
      console.log(`[websocket] closing`)
    })

    ws.send("made it")
  })
}
*/

function setUpWebSocket(ws, req) {
  console.log("reached")
  console.log('[websocket] opening')
  ws.on('message', (message, req) => {
    messageHandler.handle(message, req, ws)
  })

  ws.on('error', (err) => {
    console.log(`[websocket] ERROR: ${err}`)
  })

  ws.on('close', () => {
    console.log(`[websocket] closing`)
  })

  ws.send("made it")
}

module.exports = setUpWebSocket
