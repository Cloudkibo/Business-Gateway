const http = require('http')
const https = require('https')
const fs = require('fs')
const logger = require('./../components/logger')
const TAG = 'config/setup.js'

module.exports = function (app, httpapp, config) {
  let options = {
    ca: '',
    key: '',
    cert: ''
  }

  if (['production', 'staging'].indexOf(config.env) > -1) {
    try {
      options = {
        ca: fs.readFileSync('/root/certs/kibolite.ca-bundle'),
        key: fs.readFileSync('/root/certs/kibolite.key'),
        cert: fs.readFileSync('/root/certs/kibolite.crt')
      }
    } catch (e) {
      console.log(e)
    }
  }

  const server = http.createServer(httpapp)
  const httpsServer = https.createServer(options, app)

  if (['production', 'staging'].indexOf(config.env) > -1) {
    httpapp.get('*', (req, res) => {
      res.redirect(`${config.domain}${req.url}`)
    })
  }

  // TODO: we will enable this while doing socket io
  const socket = require('socket.io').listen(
    (config.env === 'production' || config.env === 'staging') ? httpsServer
    : server)

  server.listen(config.port, () => {
    logger.serverLog(TAG, `KiboEngage server STARTED on ${
      config.port} in ${config.env} mode`)
  })

  httpsServer.listen(config.secure_port, () => {
    logger.serverLog(TAG, `KiboPush server STARTED on ${
      config.secure_port} in ${config.env} mode`)
  })

  // TODO: Only enable if need to use socket
  require('./socketio').setup(socket)

  if (config.env === 'production') {
    console.log('KiboEngage server STARTED on %s in %s mode', config.port, config.env)
  }
}
