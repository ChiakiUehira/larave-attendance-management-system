const UserService = require('../../Service/UserService')
const CompanyService = require('../../Service/CompanyService')
const RestService = require('../../Service/RestService')
const HttpService = require('../../Service/HttpService')

class AttendanceController {
  constructor () {
    this.userService = new UserService()
    this.companyService = new CompanyService()
    this.restService = new RestService()
    this.httpService = new HttpService()
  }

  * destroy (req, res) {
    const userId = req.param('userId')
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const isContain = yield this.companyService.contains(loginUser, userId)
    if (!isContain) {
      return this.httpService.failed(res, { error: 'Forbidden' }, 403)
    }
    const rest = yield this.restService.getById(id)
    if (rest) {
      yield rest.delete()
      return this.httpService.success(res)
    }
    return this.httpService.failed(res, { error: 'Forbidden' }, 403)
  }
}

module.exports = AttendanceController
