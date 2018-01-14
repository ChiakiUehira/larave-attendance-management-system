'use strict'

const User = exports = module.exports = {}
const LogService = require('../Service/LogService')

User.onEdit = function * (logData) {
  const logService = new LogService()
  yield logService.store(logData)
}
