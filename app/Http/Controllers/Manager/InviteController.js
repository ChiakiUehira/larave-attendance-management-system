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

    if (validation.fails()) {
      return this.httpService.failed(res, {error: 'Forbidden'}, 403)
    }

    const user = yield this.userService.getByEmail(context.email)
    if(user){
      if(user.registered) {
        //本登録済み
        return this.httpService.failed(res, {message: 'overlapping'}, 403)
      }else{
        //仮登録状態の場合レコードを上書きして招待メールを送る
        user.fill(context)
        yield user.save()
        let {user_id, token} = yield this.tokenService.storeUrlToken(user)
        yield this.mailService.invite(user_id, token, user.email)
        return this.httpService.success(res)
      }
    }
    const newUser = yield this.userService.store(company, context)
    let {user_id, token} = yield this.tokenService.storeUrlToken(newUser)
    yield this.mailService.invite(user_id, token, newUser.email)

    return this.httpService.success(res)
  }
}

module.exports = InviteController
