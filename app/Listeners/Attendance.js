'use strict'

const Attendance = exports = module.exports = {}
const LogService = require('../Service/LogService')

Attendance.onEdit = function * (logData) {
  const logService = new LogService()
  yield logService.store(logData)
}
