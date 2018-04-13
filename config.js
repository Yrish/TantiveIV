let config = {
  PORT: 8001,
  DOMAIN: 'study.test',
  WEBSOCKETCONFIG: {
    port: 8004,
  },
}
config.WEBSOCKETCONFIG.domain = config.DOMAIN

module.exports = config
