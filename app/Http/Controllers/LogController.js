const HttpService = require('../../Service/HttpService')
const LogService = require('../../Service/LogService')
const CompanyService = require('../../Service/CompanyService')

class LogController {
  constructor () {
    this.httpService = new HttpService()
    this.logService = new LogService()
    this.companyService = new CompanyService()
  }

  * index (req, res) {
    const loginUser = yield req.auth.getUser()
    const company = yield this.companyService.getCompanyFromUser(loginUser)
    const logs = yield this.logService.fetchLogs(company,loginUser)
    return this.httpService.success(res, { logs })
  }
  * show (req, res) {
    const logId = req.param('id')
    const log = yield this.logService.findById(logId)
    return this.httpService.success(res,{ log })
  }
}
module.exports = LogController
