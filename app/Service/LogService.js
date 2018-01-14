'use strict'

const Log = require('../Model/Log')

class LogService {
  * store (logData) {
    const log = new Log()
    log.type = logData.type
    log.user_id = logData.userId
    log.from  = logData.from
    log.to = logData.to
    yield log.save()
  }
}

module.exports = LogService

