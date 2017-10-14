
const Group = use('App/Model/Group')
const CompanyService = require('../../Service/CompanyService')


class AttendanceService {
  constructor () {
    this.companyService = new CompanyService()
  }

  * getGroups (user) {
    const company = yield this.companyService.getCompanyFromUser(loginUser)
    return company.groups().fetch()
  }
}

module.exports = AttendanceService
