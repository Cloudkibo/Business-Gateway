// Production specific configuration
// ==================================
module.exports = {

  // Server port
  port: process.env.PORT || 8000,

  // Secure Server port
  secure_port: process.env.SECURE_PORT || 8443,

  domain: `${process.env.DOMAIN || 'https://kibolite.cloudkibo.com'}`,

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost/kibolite-prod'
  },
  seedDB: false,
  facebook: {
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: `${process.env.DOMAIN}/auth/facebook/callback`
  },

  api_urls: {
    webhook: 'https://webhook.cloudkibo.com/api',
    kibopush: 'https://app.kibopush.com/api',
    accounts: 'https://accounts.cloudkibo.com/api/v1',
    chat: 'https://kibochat.cloudkibo.com/api',
    kibochat: `${process.env.DB_LAYER_IP_KIBOCHAT}/api/v1`,
    // kiboengage: `${process.env.DB_LAYER_IP_KIBOENGAGE}/api/v1`,
    kiboengage: `https://kiboengage.cloudkibo.com/api`
  },
  webhook_ip: process.env.WEBHOOK_IP_ADDRESS || 'localhost',
  papertrail_log_levels: process.env.PAPERTRAIL_LOG_LEVELS
}
