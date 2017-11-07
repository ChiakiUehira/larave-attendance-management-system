const CompanyService = require('../Service/CompanyService')
const Group = require('../Model/Group')

class AttendanceService {
  constructor () {
    this.companyService = new CompanyService()
  }

  * getGroups (user) {
    const company = yield this.companyService.getCompanyFromUser(user)
    const groups = yield company.groups().fetch()
    return groups
  }
  * store (user, groupName){
    const company = yield this.companyService.getCompanyFromUser(user)
    let group = new Group()
    group.name = groupName
    group.company_id = company.id
    yield group.save()
    return group
  }
}

module.exports = AttendanceService
