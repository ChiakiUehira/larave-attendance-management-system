'use strict'

const User = exports = module.exports = {}
const Log = require('../Model/Log')
// todo 誰が、誰のユーザ情報を何から何に変更したか
User.onEdit = function * (logData) {
  const log = new Log()
  log.type = 'user'
  log.from  = logData.from
  log.to = logData.to
  yield log.save()
}
