exports.uploadCSV = {
  type: 'object',
  properties: {
    phoneColumn: {
      type: 'string'
    },
    subscriberIdColumn: {
      type: 'string'
    },
    page_id: {
      type: 'string',
      required: true
    },
    message: {
      type: 'array',
      items: {},
      required: true
    },
    columns: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    file: {
      type: 'object',
      required: true
    },
    filter: {
      type: 'array',
      items: {}
    }
  }
}

exports.update = {
  type: 'object',
  properties: {
    query: {
      type: 'object'
    },
    newPayload: {
      type: 'object'
    },
    options: {
      type: 'object'
    }
  }
}
