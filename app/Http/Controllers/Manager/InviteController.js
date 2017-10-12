const UserService = require('../../../Service/UserService')
const CompanyService = require('../../../Service/CompanyService')
const UserContext = require('../../Contexts/UserContext')
const MailService = require('../../../Service/MailService')
const TokenService = require('../../../Service/TokenService')
const HttpService = require('../../../Service/HttpService')
const Validator = use('Validator')

class InviteController {
  constructor () {
    this.userService = new UserService()
    this.userContext = new UserContext()
    this.companyService = new CompanyService()
    this.mailService = new MailService()
    this.tokenService = new TokenService()
    this.httpService = new HttpService()
  }

  //todo test
  * store (req, res) {
    const loginUser = yield req.auth.getUser()
    const company = yield this.companyService.getCompanyFromUser(loginUser)
    const rules = this.userContext.storeRules()
    const context = this.userContext.storeContext(req)

    console.log(rules, context)
    const validation = yield Validator.validateAll(context, rules)

    if (validation.fails()) {
      return this.httpService.failed(res, {error: 'Forbidden'}, 403)
    }

    const user = yield this.userService.store(company, context)
    const {user_id, token} = yield this.tokenService.storeUrlToken(user)
    yield this.mailService.invite(user_id, token, user.email)//todo エラー処理
    return this.httpService.success(res)
  }
}

module.exports = InviteController
