'use strict'

const Log = require('../Model/Log')
const CompanyService = require('../Service/CompanyService')
const UserService = require('../Service/UserService')

class LogService {
  constructor () {
    this.companyService = new CompanyService()
    this.userService = new UserService()
  }

  * store (logData) {
    const user = yield this.userService.getById(logData.userId)
    const company = yield this.companyService.getCompanyFromUser(user)

    const log = new Log()
    log.company_id = company.id
    log.type = logData.type
    log.user_id = logData.userId
    log.from  = logData.from ? logData.from : {}
    log.to = logData.to ? logData.to : {}
    yield log.save()
  }
  * fetchLogs (company,loginUser){
    let logs = yield Log
      .query()
      .orderBy('updated_at','desc')
      .where('company_id', company.id)
      .fetch()

    logs = logs.filter((log)=>{
      return log.type === 'attendance' && JSON.parse(log.to).user_id === loginUser.id ||
        log.type === 'company' ||
        log.type === 'group' ||
        log.type === 'user' && JSON.parse(log.to).id === loginUser.id
    })

    return logs
  }

  * findById(id){
    const log = yield Log.find(id)
    return log
  }
}

module.exports = LogService

