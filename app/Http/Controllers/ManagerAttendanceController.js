const AttendanceService = require('../../Service/AttendanceService')
const AttendanceContext = require('../Contexts/AttendanceContext')
const UserService = require('../../Service/UserService')
const CompanyService = require('../../Service/CompanyService')
const HttpService = require('../../Service/HttpService')
const Validator = use('Validator')

class ManagerAttendanceController {
  constructor () {
    this.attendanceService = new AttendanceService()
    this.attendanceContext = new AttendanceContext()
    this.userService = new UserService()
    this.companyService = new CompanyService()
    this.httpService = new HttpService()
  }

  * index (req, res) {
    const limit = req.input('limit', 10)
    const offset = req.input('offset', 0)
    const loginUser = yield req.auth.getUser()
    const company = yield this.companyService.getCompanyFromUser(loginUser)
    const attendances = yield this.attendanceService.limited(company, offset, limit)
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

  * store (req, res) {
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const isContain = yield this.companyService.contains(loginUser, id)
    if (!isContain) {
      return this.httpService.failed(res, { error: 'Forbidden' }, 403)
    }

    const user = yield this.userService.getById(id)
    if (!user) {
      return this.httpService.failed(res, { error: 'Forbidden' }, 403)
    }

    const rules = this.attendanceContext.storeRules()
    const context = this.attendanceContext.storeContext(req)
    const validation = yield Validator.validateAll(context, rules)
    if (validation.fails()) {
      return this.httpService.failed(res, {error: validation.messages()}, 400)
    }

    const attendances = yield this.attendanceService.store(user, context)
    return this.httpService.success(res, {attendances})
  }

  * update (req, res) {
    const userId = req.param('userId')
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const isContain = yield this.companyService.contains(loginUser, userId)
    if (!isContain) {
      return this.httpService.failed(res, { error: 'Forbidden' }, 403)
    }
    const user = yield this.userService.getById(userId)
    const isContainByUserId = yield this.attendanceService.contains(user, id)
    if (!isContainByUserId) {
      return this.httpService.failed(res, { error: 'Forbidden' }, 403)
    }

    const rules = this.attendanceContext.updateRules()
    const context = this.attendanceContext.updateContext(req)
    const validation = yield Validator.validateAll(context, rules)
    if (validation.fails()) {
      return this.httpService.failed(res, {error: validation.messages()}, 400)
    }

    const attendances = yield this.attendanceService.update(id, context)
    return this.httpService.success(res, {attendances})
  }

  * destroy (req, res) {
    const userId = req.param('userId')
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const isContain = yield this.companyService.contains(loginUser, userId)
    if (!isContain) {
      return this.httpService.failed(res, { error: 'Forbidden' }, 403)
    }
    const user = yield this.userService.getById(userId)
    const isContainByUserId = yield this.attendanceService.contains(user, id)
    if (!isContainByUserId) {
      return this.httpService.failed(res, { error: 'Forbidden' }, 403)
    }
    const attendances = yield this.attendanceService.getById(id)
    yield attendances.delete()
    return this.httpService.success(res)
  }
}

module.exports = ManagerAttendanceController
