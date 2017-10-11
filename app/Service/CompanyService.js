'use strict'

const CompanyModel = use('App/Model/Company')

class CompanyService {
  * getCompanyFromUser (user) {
    const company = yield user.company().first()
    return company
  }

  * checkSomeCompany (user, id) {
    const company = yield user.company().first()
    const users = yield company.users().fetch()
    return users.some((user) => {
      return user.id === Number(id)
    })
  }

  * store (context) {
    const company = new CompanyModel(context)
    yield company.save()
    return company
  }

  * update (user, context) {
    const company = yield this.getCompanyFromUser(user)
    if (company) {
      company.fill(context)
      yield company.save()
      return company
    } else {
      return {}
    }
  }
}

module.exports = CompanyService
