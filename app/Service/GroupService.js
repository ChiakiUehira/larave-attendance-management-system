const CompanyService = require('../Service/CompanyService')

class AttendanceService {
  constructor () {
    this.companyService = new CompanyService()
  }

  * getGroups (user) {
    const company = yield this.companyService.getCompanyFromUser(user)
    const groups = yield company.groups().fetch()
    return groups
  }
}

module.exports = AttendanceService
