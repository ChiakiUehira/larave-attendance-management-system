const CompanyService = require('../Service/CompanyService')
const Group = require('../Model/Group')

class GroupService {
  constructor () {
    this.companyService = new CompanyService()
  }
  * getGroups (user) {
    const company = yield this.companyService.getCompanyFromUser(user)
    const groups = yield company.groups().fetch()
    return groups
  }
  * isExitById (user, id) {
    const company = yield this.companyService.getCompanyFromUser(user)
    const groups = yield company.groups().fetch()
    return groups.some((group) => {
      return group.id === id
    })
  }
  * store (user, groupName) {
    const company = yield this.companyService.getCompanyFromUser(user)
    let group = new Group()
    group.name = groupName
    group.company_id = company.id
    yield group.save()
    return group
  }
  * destroy (user, id) {
    const company = yield this.companyService.getCompanyFromUser(user)
    const group = yield company.groups().where('id', id).first()
    if (group) {
      const users = yield group.users().fetch()
      yield users.value().map((user) => {
        user.group_id = null
        return user.save()
      })
      yield group.delete()
      return true
    }
    return false
  }
}

module.exports = GroupService
