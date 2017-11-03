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

  * store (req, res) {
    const rules = this.userContext.storeRules()
    const context = this.userContext.storeContext(req)
    const validation = yield Validator.validateAll(context, rules)
    const user = yield this.userService.getByEmail(req.input('email'))
    if (validation.fails()) {
      return this.httpService.failed(res, {error: 'Forbidden'}, 403)
    }
    if (user) {
      if (user.registered) {
        // 本登録済み
        return this.httpService.failed(res, {message: 'overlapping'}, 403)
      } else {
        // 仮登録済み
        yield this.tokenService.deleteUrlToken(user.id)
        user.fill(context)
        yield user.save()
        let {user_id, token} = yield this.tokenService.storeUrlToken(user)
        yield this.mailService.invite(user_id, token, user.email)
        return this.httpService.success(res)
      }
    } else {
      // 未登録
      const loginUser = yield req.auth.getUser()
      const company = yield this.companyService.getCompanyFromUser(loginUser)
      const newUser = yield this.userService.store(company, context)
      const { token } = yield this.tokenService.storeUrlToken(newUser)
      yield this.mailService.invite(newUser, company, token)
      return this.httpService.success(res)
    }
  }
}

module.exports = InviteController
