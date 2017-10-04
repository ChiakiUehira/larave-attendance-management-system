'use strict'

const CompanyModel = use('App/Model/Company')

class CompanyService {
  * getCompanyFromUser (user) {
    const company = yield user.company().first()
    return company
  }

  * checkSomeCompany (user, id) {
    const company = yield user.company().first()
    const users = yield company.users()
    return users.some((user) => {
      return user.id === Number(id)
    })
  }

  * store (context) {
    const company = new CompanyModel(context)
    yield company.save()
    return company
  }
}

module.exports = CompanyService
