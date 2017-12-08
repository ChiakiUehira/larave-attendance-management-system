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

  * index (req, res) {
    const loginUser = yield req.auth.getUser()
    const company = yield this.companyService.getCompanyFromUser(loginUser)
    const users = yield this.userService.fetchInvitingUser(company)
    return this.httpService.success(res, {users})
  }

  * store (req, res) {
    const rules = this.userContext.storeRules()
    const loginUser = yield req.auth.getUser()
    const company = yield this.companyService.getCompanyFromUser(loginUser)
    const users = req.all()

    for (let key in users) {
      const context = this.userContext.inviteContext(users[key])
      const validation = yield Validator.validateAll(context, rules)
      const user = yield this.userService.getByEmail(users[key].email)
      //諸々バリデーション
      if (validation.fails()) {
        return this.httpService.failed(res, {message: `${users[key].email}の必須項目が入力されていません`}, 403)
      }
      if (user) {
        if (user.registered) {
          return this.httpService.failed(res, {message: `${user.email}は登録済みIDです`}, 403)
        }
        yield this.tokenService.deleteUrlToken(user.id)
        yield user.delete()
      }
      // 招待処理
      const newUser = yield this.userService.store(company, context)
      const {token} = yield this.tokenService.storeUrlToken(newUser)
      yield this.mailService.invite(newUser, company, token)
    }
    return this.httpService.success(res, {users})
  }
}

module.exports = InviteController
