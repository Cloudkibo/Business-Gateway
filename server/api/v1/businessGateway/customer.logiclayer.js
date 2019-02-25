const path = require('path')
const crypto = require('crypto')

exports.directory = function (req) {
  var today = new Date()
  var uid = crypto.randomBytes(5).toString('hex')
  var serverPath = 'f' + uid + '' + today.getFullYear() + '' +
    (today.getMonth() + 1) + '' + today.getDate()
  serverPath += '' + today.getHours() + '' + today.getMinutes() + '' +
    today.getSeconds()
  let fext = req.files.file.name.split('.')
  serverPath += '.' + fext[fext.length - 1]
  let dir = path.resolve(__dirname, '../../../../broadcastFiles/')
  return {
    serverPath: serverPath, dir: dir
  }
}

exports.checkFilterValues = function (values, data) {
  var matchCriteria = true
  console.log('Filter Values', values)
  if (values.length > 0) {
    for (var i = 0; i < values.length; i++) {
      var filter = values[i]
      console.log('Filter', filter)
      if (filter.criteria === 'is') {
        if (data[`${filter.column}`] === filter.value) {
          matchCriteria = true
        } else {
          matchCriteria = false
          break
        }
      } else if (filter.criteria === 'contains') {
        if (data[`${filter.column}`].toLowerCase().includes(filter.value.toLowerCase())) {
          matchCriteria = true
        } else {
          matchCriteria = false
          break
        }
      } else if (filter.criteria === 'begins') {
        var subText = data[`${filter.column}`].substring(0, filter.value.length)
        if (subText.toLowerCase() === filter.value.toLowerCase()) {
          matchCriteria = true
        } else {
          matchCriteria = false
          break
        }
      }
    }
  }
  return matchCriteria
}
