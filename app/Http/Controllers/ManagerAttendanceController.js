const AttendanceService = require('../../Service/AttendanceService')
const AttendanceContext = require('../Contexts/AttendanceContext')
const UserService = require('../../Service/UserService')
const CompanyService = require('../../Service/CompanyService')
const HttpService = require('../../Service/HttpService')

class AttendanceController {
  constructor () {
    this.attendanceService = new AttendanceService()
    this.attendanceContext = new AttendanceContext()
    this.userService = new UserService()
    this.companyService = new CompanyService()
    this.httpService = new HttpService()
  }

  * index (req, res) {
    const limit = req.input('limit', 10)
    const attendances = yield this.attendanceService.limited(limit)
    return this.httpService.success(res, {attendances})
  }

  * byUser (req, res) {
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const isContain = yield this.companyService.contains(loginUser, id)
    if (!isContain) {
      return this.httpService.failed(res, { error: 'Forbidden' }, 403)
    }
    const user = yield this.userService.getById(id)
    const context = this.attendanceContext.indexContext(req)
    const attendances = yield this.attendanceService.search(user, context)
    return this.httpService.success(res, {context, attendances})
  }

  * getByDate (req, res) {
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const isContain = yield this.companyService.contains(loginUser, id)
    if (!isContain) {
      return this.httpService.failed(res, { error: 'Forbidden' }, 403)
    }
    const context = this.attendanceContext.getByDateContext(req)
    if (!context.date) {
      return this.httpService.failed(res, {error: 'Forbidden'}, 403)
    }
    const user = yield this.userService.getById(id)
    const attendances = yield this.attendanceService.getByDate(user, context)
    return this.httpService.success(res, {attendances})
  }
}

module.exports = AttendanceController
