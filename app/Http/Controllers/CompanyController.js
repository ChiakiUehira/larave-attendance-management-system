
const CompanyService = require('../../Service/CompanyService')
const CompanyContext = require('../Contexts/CompanyContext')
const HttpService = require('../../Service/HttpService')
const Validator = use('Validator')
const Event = use('Event')

class CompanyController {
  constructor () {
    this.companyService = new CompanyService()
    this.companyContext = new CompanyContext()
    this.httpService = new HttpService()
  }

  * show (req, res) {
    const loginUser = yield req.auth.getUser()
    const company = yield this.companyService.getCompanyFromUser(loginUser)
    if (!company) {
      return this.httpService.failed(res, { error: 'Forbidden' }, 403)
    }
    return this.httpService.success(res, { company })
  }

  // apiではいらない
  // * store (req, res) {
  //   const rules = this.companyContext.storeRules()
  //   const context = this.companyContext.storeContext(req)
  //   const validation = yield Validator.validateAll(context, rules)
  //   if (validation.fails()) {
  //     return this.httpService.failed(res, {error: validation.messages()}, 400)
  //   }
  //   const company = yield this.companyService.store(context)
  //   return this.httpService.success(res, {company})
  // }

  * update (req, res) {
    const loginUser = yield req.auth.getUser()
    const rules = this.companyContext.storeRules()
    const context = this.companyContext.storeContext(req)
    const validation = yield Validator.validateAll(context, rules)
    if (validation.fails()) {
      return this.httpService.failed(res, { error: validation.messages() }, 400)
    }
    const oldCompany = yield this.companyService.getCompanyFromUser(loginUser)
    const company = yield this.companyService.update(loginUser, context)
    Event.fire('company.edit', {userId: loginUser.id, type:'company', from: oldCompany.toJSON(), to: company.toJSON()})
    return this.httpService.success(res, { company })
  }

  * destroy (req, res) {
    const loginUser = yield req.auth.getUser()
    const company = yield this.companyService.getCompanyFromUser(loginUser)
    const isSuccess = yield this.companyService.destroy(company)
    if (!isSuccess) {
      return this.httpService.failed(res, {error: 'Forbidden'}, 403)
    }
    return this.httpService.success(res)
  }
}

module.exports = CompanyController
