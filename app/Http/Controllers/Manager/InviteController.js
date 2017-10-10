const UserService = require('../../../Service/UserService')
const CompanyService = require('../../../Service/CompanyService')
const UserContext = require('../../Contexts/UserContext')
const MailService = require('../../../Service/MailService')
const Validator = use('Validator')

class InviteController {
  constructor () {
    this.userService = new UserService()
    this.userContext = new UserContext()
    this.companyService = new CompanyService()
    this.mailService = new MailService()
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
      //todo urlにつけるtokenの生成
      //todo エラー処理
      const results = yield this.mailService.invite(user)
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
