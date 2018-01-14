const HttpService = require('../../Service/HttpService')
const GroupService = require('../../Service/GroupService')
const GroupContext = require('../Contexts/GroupContext')
const Validator = use('Validator')
const Event = use('Event')

class CompanyController {
  constructor () {
    this.groupService = new GroupService()
    this.httpService = new HttpService()
    this.groupContext = new GroupContext()
  }

  * fetchGroup(req, res) {
    const loginUser = yield req.auth.getUser()
    const group = yield this.groupService.getGroup(loginUser, req.param('id'))
    return this.httpService.success(res, {group: group})
  }

  * index (req, res) {
    const loginUser = yield req.auth.getUser()
    const groups = yield this.groupService.getGroups(loginUser)
    return this.httpService.success(res, {groups: groups})
  }

  * store (req, res) {
    const loginUser = yield req.auth.getUser()
    const rules = this.groupContext.storeRules()
    const context = this.groupContext.storeContext(req)
    const validation = yield Validator.validateAll(context, rules)
    if (validation.fails()) {
      return this.httpService.failed(res, {error: validation.messages()}, 400)
    }
    const group = yield this.groupService.store(loginUser, context)
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

  * edit (req, res) {
    const loginUser = yield req.auth.getUser()
    const groupId = req.param('id')
    const context = this.groupContext.editContext(req)
    const oldGroup = yield this.groupService.getGroup(loginUser, groupId);
    const group = yield this.groupService.edit(loginUser, groupId, context)
    Event.fire('group.edit', {userId: loginUser.id, type: 'group', from: oldGroup.toJSON(), to: group.toJSON()})

    return this.httpService.success(res)
  }
}

module.exports = CompanyController
