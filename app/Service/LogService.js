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
  * fetchLogs (loginUser){
    let logs = yield Log
      .query()
      .orderBy('updated_at','desc')
      .fetch()

    logs = logs.filter((log)=>{
      return log.type === 'company' || log.type === 'group' || log.type === 'user' && JSON.parse(log.to).id === loginUser.id
    })

    return logs
  }

  * findById(id){
    const log = yield Log.find(id)
    return log
  }
}

module.exports = LogService

