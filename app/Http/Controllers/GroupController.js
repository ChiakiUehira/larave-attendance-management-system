const HttpService = require('../../Service/HttpService')
const GroupService = require('../../Service/GroupService')
const Validator = use('Validator')

class CompanyController {
  constructor () {
    this.groupService = new GroupService()
    this.httpService = new HttpService()
  }

  * index (req, res) {
    const loginUser = yield req.auth.getUser()
    const groups = yield this.groupService.getGroups(loginUser)
    return this.httpService.success(res, {groups:groups})
  }
}

module.exports = CompanyController
