const config = require('./config/environment/index')
const path = require('path')

module.exports = function (app) {
  // API middlewares go here
  const env = app.get('env')

  app.use('/api/v1/test', require('./api/v1/test'))
  app.use('/api/subscribers', require('./api/v1/subscribers'))
  app.use('/api/users', require('./api/v1/user'))
  app.use('/api/company', require('./api/v1/companyprofile'))
  app.use('/api/pages', require('./api/v1/pages'))
  app.use('/auth', require('./auth'))
  app.use('/api/reset_password', require('./api/v1/passwordresettoken'))
  app.use('/api/broadcasts', require('./api/v1/broadcasts'))
  app.use('/api/tags', require('./api/v1/tags'))
  app.use('/api/dashboard', require('./api/v1/dashboard'))
  app.use('/api/scripts', require('./api/scripts'))
  app.use('/api/businessGateway', require('./api/v1/businessGateway'))

  // auth middleware go here if you authenticate on same server

  app.get('/', (req, res) => {
    res.cookie('environment', config.env,
      {expires: new Date(Date.now() + 900000)})
    res.cookie('url_production', 'https://kibolite.cloudkibo.com',
      {expires: new Date(Date.now() + 900000)})
    res.cookie('url_staging', 'https://skibolite.cloudkibo.com',
      {expires: new Date(Date.now() + 900000)})
    res.cookie('url_development', 'http://localhost:8000',
      {expires: new Date(Date.now() + 900000)})
    // res.sendFile(path.join(config.root, 'client/index.html'))
    res.render('main', { environment: env })
  })

  app.get('/react-bundle', (req, res) => {
    res.sendFile(path.join(__dirname, '../../KiboPush/client/public/js', 'bundle.js'))
  })

  app.get('/', (req, res) => {
    res.sendFile('./../client/build/index.html')
  })

  app.route('/:url(api|auth)/*').get((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`})
  }).post((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`})
  })

  app.route('/*').get((req, res) => {
    res.redirect('/')
  }).post((req, res) => {
    res.redirect('/')
  })
}
