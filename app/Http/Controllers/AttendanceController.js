
const AttendanceService = require('../../Service/AttendanceService')
const AttendanceContext = require('../Contexts/AttendanceContext')
const CompanyService = require('../../Service/CompanyService')
const HttpService = require('../../Service/HttpService')

class AttendanceController {
  constructor () {
    this.attendanceService = new AttendanceService()
    this.attendanceContext = new AttendanceContext()
    this.companyService = new CompanyService()
    this.httpService = new HttpService()
  }
  * index (req, res) {
    const loginUser = yield req.auth.getUser()
    const context = this.attendanceContext.indexContext(req)
    const attendances = yield this.attendanceService.search(loginUser, context)
    return this.httpService.success(res, {context, attendances})
  }
  * show (req, res) {
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const isContain = yield this.attendanceService.contains(loginUser, id)
    if (!isContain) {
      return this.httpService.failed(res, {error: 'Forbidden'}, 403)
    }
    const attendance = yield this.attendanceService.getById(id)
    return this.httpService.success(res, {attendance})
  }
}

module.exports = AttendanceController
