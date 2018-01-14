'use strict'

const Group = exports = module.exports = {}
const LogService = require('../Service/LogService')

Group.onEdit = function * (logData) {
  const logService = new LogService()
  yield logService.store(logData)
}
