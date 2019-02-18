'use strict'

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/kiboengage-dev'
  },
  seedDB: false,
  domain: 'http://localhost:8000',
  api_urls: {
    webhook: 'http://localhost:3020/api',
    kibopush: 'http://localhost:3000/api',
    accounts: 'http://localhost:3024/api/v1',
    chat: 'http://localhost:3022/api',
    kibochat: `http://localhost:3030/api/v1`,
    kiboengage: `http://localhost:3031/api/v1`
  },
  webhook_ip: 'http://localhost:3020'
}
