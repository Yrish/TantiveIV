let makesendable = (message) => {

  return JSON.stringify(message)
}
let make = (type, payload) => {
  return {type, payload}
}

module.exports = {make,makesendable}
