'use strict'

const Job = exports = module.exports = {}
const LogService = require('../Service/LogService')

Job.onEdit = function * (logData) {
  console.log(logData)
  const logService = new LogService()
  yield logService.store(logData)
}
