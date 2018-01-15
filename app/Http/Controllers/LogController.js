const HttpService = require('../../Service/HttpService')
const LogService = require('../../Service/LogService')

class LogController {
  constructor () {
    this.httpService = new HttpService()
    this.logService = new LogService()
  }

  * index (req, res) {
    const loginUser = yield req.auth.getUser()
    const logs = yield this.logService.fetchLogs(loginUser)
    return this.httpService.success(res, { logs })
  }
  * show (req, res) {
    const logId = req.param('id')
    const log = yield this.logService.findById(logId)
    return this.httpService.success(res,{ log })
  }
}
module.exports = LogController
