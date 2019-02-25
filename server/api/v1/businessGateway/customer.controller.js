const logger = require('../../../components/logger')
const TAG = 'api/businessGateway/customer.controller.js'
const CustomerDataLayer = require('./customer.datalayer')
const utility = require('../utility')
const logicLayer = require('./customer.logiclayer')
let request = require('request')
const fs = require('fs')
const csv = require('csv-parser')
const path = require('path')

exports.uploadCSV = function (req, res) {
  console.log('uploadCSV')
  /* TestData - Start */
  req.body.message = [{'componentType': 'text', 'text': 'Please subscribe to my page *Askari V* by typing Yes'}]
  req.body.columns = ['city', 'tags', 'email']
  req.body.filter = [{'column': 'city', 'criteria': 'contains', 'value': 'Karachi'}, {'column': 'tags', 'criteria': 'begins', 'value': 'yell'}]
  /* TestData - End */
  let directory = logicLayer.directory(req)
  console.log('Directory', directory)
  if (req.files.file.size === 0) {
    return res.status(400).json({
      status: 'failed',
      description: 'No file submitted'
    })
  }
  utility.callApi(`companyUser/query`, 'post', { domain_email: req.user.domain_email }, req.headers.authorization)
    .then(companyUser => {
      console.log('companyUser', companyUser)
      var phoneColumn = req.body.phoneColumn
      fs.rename(req.files.file.path, path.join(directory.dir, '/userfiles/', directory.serverPath), err => {
        if (err) {
          return res.status(500).json({
            status: 'failed',
            description: 'internal server error' + JSON.stringify(err)
          })
        }
        fs.createReadStream(path.join(directory.dir, '/userfiles/', directory.serverPath))
          .pipe(csv())
          .on('data', function (data) {
            console.log('data', data)
            if (data[`${phoneColumn}`]) {
              var matchCriteria = logicLayer.checkFilterValues(req.body.filter, data)
              if (matchCriteria) {
                var phoneNumber = data[`${phoneColumn}`]
                console.log('matchCriteria', matchCriteria)
                CustomerDataLayer.findUsingQuery({'phoneNumber': phoneNumber, 'pageId': req.body.page_id, 'companyId': companyUser.companyId})
                  .then(customer => {
                    console.log('customer', customer)
                    var customerPayload = {}
                    if (customer) {
                      customerPayload.fileName = req.files.file.name.substring(0, req.files.file.name.indexOf('.'))
                      customerPayload.payload = []
                      for (let i = 0; i < req.body.columns.length; i++) {
                        var properties = {}
                        properties.key = req.body.columns[i]
                        properties.value = data[`${req.body.columns[i]}`]
                        console.log('Customer Payload', customerPayload.payload)
                        customerPayload.payload.push(properties)
                      }
                      console.log('Customer Payload', req.files.file.name, req.user._id)
                      CustomerDataLayer.findAndUpdateCustomerObject({_id: customer._id}, customerPayload)
                        .then(updatedCustomer => {
                          console.log('updatedCustomer', updatedCustomer)
                          sendMessage(req, phoneNumber)
                        })
                        .catch(error => {
                          logger.serverLog(TAG, `Failed to update customer ${JSON.stringify(error)}`)
                        })
                    } else {
                      console.log('Customer Payload', req.files.file.name, req.user._id)
                      customerPayload.userId = req.user._id
                      customerPayload.fileName = req.files.file.name.substring(0, req.files.file.name.indexOf('.'))
                      customerPayload.companyId = companyUser.companyId
                      customerPayload.pageId = req.body.page_id
                      customerPayload.phoneNumber = data[`${phoneColumn}`]
                      customerPayload.payload = []
                      console.log('Customer Payload', customerPayload)
                      for (let i = 0; i < req.body.columns.length; i++) {
                        properties = {}
                        properties.key = req.body.columns[i]
                        properties.value = data[`${req.body.columns[i]}`]
                        customerPayload.payload.push(properties)
                      }
                      CustomerDataLayer.createCustomerObject(customerPayload)
                        .then(savedCustomer => {
                          console.log('savedCustomer', savedCustomer)
                          sendMessage(req, phoneNumber)
                        })
                        .catch(error => {
                          logger.serverLog(TAG, `Failed to update number ${JSON.stringify(error)}`)
                        })
                    }
                  })
                  .catch(err => {
                    console.log(`Failed to fetch phone number${JSON.stringify(err)}`)
                  })
              }
            } else {
              return res.status(404)
                .json({status: 'failed', description: 'Incorrect column names'})
            }
          })
          .on('end', function () {
            console.log('Calling on End')
            fs.unlinkSync(directory.dir + '/userfiles/' + directory.serverPath)
            return res.status(201)
              .json({
                status: 'success',
                description: 'Customers were sent the invitation message'
              })
          })
      })
    })
    .catch(err => {
      return res.status(500).json({
        status: 'failed',
        payload: `Failed to get company user ${JSON.stringify(err)}`
      })
    })
}

function sendMessage (req, phone) {
  utility.callApi(`pages/query`, 'post', {userId: req.user._id, connected: true, _id: req.body.page_id}, req.headers.authorization)
    .then(pages => {
      getBatchData(req.body.message, 'NON_PROMOTIONAL_SUBSCRIPTION', phone, pages[0])
    })
    .catch(error => {
      logger.serverLog(TAG, `Failed to fetch pages ${JSON.stringify(error)}`)
    })
}
function prepareMessageData (body) {
  let payload = {}
  let text = body.text
  console.log(body.buttons)
  if (body.componentType === 'text' && !body.buttons) {
    payload = {
      'text': text,
      'metadata': 'This is a meta data'
    }
    return payload
  } else if (body.componentType === 'text' && body.buttons) {
    payload = {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'button',
          'text': text,
          'buttons': body.buttons
        }
      }
    }
  } else if (['image', 'audio', 'file', 'video'].indexOf(
    body.componentType) > -1) {
    payload = {
      'attachment': {
        'type': body.componentType,
        'payload': {
          'attachment_id': body.fileurl.attachment_id
        }
      }
    }
    return payload
    // todo test this one. we are not removing as we need to keep it for live chat
    // if (!isForLiveChat) deleteFile(body.fileurl)
  } else if (['gif', 'sticker', 'thumbsUp'].indexOf(
    body.componentType) > -1) {
    payload = {
      'attachment': {
        'type': 'image',
        'payload': {
          'url': body.fileurl
        }
      }
    }
  } else if (body.componentType === 'card') {
    if (body.default_action) {
      payload = {
        'attachment': {
          'type': 'template',
          'payload': {
            'template_type': 'generic',
            'elements': [
              {
                'title': body.title,
                'image_url': body.image_url,
                'subtitle': body.description,
                'buttons': body.buttons,
                'default_action': body.default_action
              }
            ]
          }
        }
      }
    } else {
      payload = {
        'attachment': {
          'type': 'template',
          'payload': {
            'template_type': 'generic',
            'elements': [
              {
                'title': body.title,
                'image_url': body.image_url,
                'subtitle': body.description,
                'buttons': body.buttons
              }
            ]
          }
        }
      }
    }
  } else if (body.componentType === 'gallery') {
    var galleryCards = []
    if (body.cards && body.cards.length > 0) {
      for (var g = 0; g < body.cards.length; g++) {
        var card = body.cards[g]
        var galleryCard = {}
        galleryCard.image_url = card.image_url
        galleryCard.title = card.title
        galleryCard.buttons = card.buttons
        galleryCard.subtitle = card.subtitle
        if (card.default_action) {
          galleryCard.default_action = card.default_action
        }
        galleryCards.push(galleryCard)
      }
    }
    payload = {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'generic',
          'elements': galleryCards
        }
      }
    }
  } else if (body.componentType === 'list') {
    payload = {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'list',
          'top_element_style': body.topElementStyle,
          'elements': body.listItems,
          'buttons': body.buttons
        }
      }
    }
  } else if (body.componentType === 'media') {
    payload = {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'media',
          'elements': [
            {
              'attachment_id': body.fileurl.attachment_id,
              'media_type': body.mediaType,
              'buttons': body.buttons
            }
          ]
        }
      }
    }
  }
  console.log('Return payload', payload)
  logger.serverLog(TAG,
    `Return Payload ${JSON.stringify(payload)}`)
  return payload
}
function getBatchData (payload, fbMessageTag, phone, page) {
  let recipient = 'recipient=' + encodeURIComponent(JSON.stringify({
    'phone_number': phone
  }))
  let tag = 'tag=' + encodeURIComponent(fbMessageTag)
  let messagingType = 'messaging_type=' + encodeURIComponent('MESSAGE_TAG')
  let batch = []
  console.log('Payload received to send', payload)
  logger.serverLog(TAG, `Payload received to send: ${JSON.stringify(payload)}`)
  payload.forEach((item, index) => {
    // let message = "message=" + encodeURIComponent(JSON.stringify(prepareSendAPIPayload(recipientId, item).message))
    let message = 'message=' + encodeURIComponent(JSON.stringify(prepareMessageData(item)))
    if (index === 0) {
      batch.push({'method': 'POST', 'name': `message${index + 1}`, 'relative_url': 'v2.6/me/messages', 'body': recipient + '&' + message + '&' + messagingType + '&' + tag})
    } else {
      batch.push({'method': 'POST', 'name': `message${index + 1}`, 'depends_on': `message${index}`, 'relative_url': 'v2.6/me/messages', 'body': recipient + '&' + message + '&' + messagingType + '&' + tag})
    }
    if (index === (payload.length - 1)) {
      console.log('Sending Broadcast')
      const r = request.post('https://graph.facebook.com', (err, httpResponse, body) => {
        console.log('Send Response Broadcast', body)
        if (err) {
          return logger.serverLog(TAG, `Batch send error ${JSON.stringify(err)}`)
        }
        logger.serverLog(TAG, `Batch send response ${JSON.stringify(body)}`)
      })
      const form = r.form()
      form.append('access_token', page.accessToken)
      form.append('batch', JSON.stringify(batch))
    }
  })
}
