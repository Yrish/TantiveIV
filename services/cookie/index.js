const config = require('../../config')

const expressSessionCookieConfig = {
  httpOnly: false,
  secure: false,
  domain: config.sessionDomain,
  maxAge: 24 * 60 * 60 * 1000,
}

module.exports = {expressSessionCookieConfig}
