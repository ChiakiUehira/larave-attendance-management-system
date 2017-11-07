const HttpService = require('../../Service/HttpService')
const GroupService = require('../../Service/GroupService')

class CompanyController {
  constructor () {
    this.groupService = new GroupService()
    this.httpService = new HttpService()
  }

  * index (req, res) {
    const loginUser = yield req.auth.getUser()
    const groups = yield this.groupService.getGroups(loginUser)
    return this.httpService.success(res, {groups: groups})
  }

  * store (req, res) {
    const loginUser = yield req.auth.getUser()
    const group = yield this.groupService.store(loginUser, req.input('name'))
    return this.httpService.success(res, {group: group})
  }

  * destroy (req, res) {
    const loginUser = yield req.auth.getUser()
    const isGroup = yield this.groupService.destroy(loginUser, req.param('id'))
    if (!isGroup) {
      return this.httpService.failed(res, {error: '削除対象のグループが存在しません'})
    }
    return this.httpService.success(res)
  }
}

module.exports = CompanyController
