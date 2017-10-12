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
    const validation = yield Validator.validateAll(context, rules)
    if (!validation.fails()) {
      const user = yield this.userService.store(company, context)
      const {user_id, token} = yield this.tokenService.storeUrlToken(user)
      const results = yield this.mailService.invite(user_id,token,user.email)//todo エラー処理
      res.json({
        success: true,
        results
      })
    } else {
      res.json({
        success: false,
        error: validation.messages()
      })
    }
  }
}

module.exports = InviteController
