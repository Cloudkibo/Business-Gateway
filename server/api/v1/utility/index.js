const config = require('../../../config/environment/index')
// const logger = require('../../../components/logger')
// const TAG = 'api/v1/utility/index.js'
// const util = require('util')

exports.callApi = (endpoint, method = 'get', body, token, type = 'accounts') => {
  let headers
  if (token && token !== '') {
    headers = {
      'content-type': 'application/json',
      'Authorization': token
    }
  } else {
    headers = {
      'content-type': 'application/json',
      'is_kibo_product': true
    }
  }
  let apiUrl = config.api_urls[type]
  // console.log('apiUrl: ', apiUrl)
  let options = {
    method: method.toUpperCase(),
    uri: `${apiUrl}/${endpoint}`,
    headers,
    body,
    json: true
  }
  // logger.serverLog(TAG, `requestPromise body ${util.inspect(body)}`)
  return requestPromise(options).then(response => {
    // logger.serverLog(TAG, `response from accounts ${util.inspect(response)}`)
    return new Promise((resolve, reject) => {
      if (response.status === 'success') {
        resolve(response.payload)
      } else {
        reject(response.payload)
      }
    })
  })
}