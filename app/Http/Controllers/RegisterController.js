const Validator = use('Validator')
const User = use('App/Model/User')
const UrlToken = use('App/Model/UrlToken')
const UserService = require('../../Service/UserService')
const TokenServce = require('../../Service/TokenService')
const HttpService = require('../../Service/HttpService')
const UserContext = require('../Contexts/UserContext')

class RegisterController {

  constructor () {
    this.userService = new UserService()
    this.tokenService = new TokenServce()
    this.httpService = new HttpService()
    this.userContext = new UserContext()
  }

  * index (req, res) {
    const token = yield UrlToken.findBy('token',req.input('t'))
    const user = yield token.user().fetch()

    if (!user) {
      return this.httpService.failed(res, {error: 'Forbidden'}, 403)
    }

    if (user) {
      yield res.sendView('register', {user: user})
    } else {
      return this.httpService.failed(res, {error: 'Forbidden'}, 403)
    }
  }

  * store (req, res) {
    const user = yield User.find(req.input('user_id'))
    const rules = this.userContext.storeRules()
    const context = this.userContext.storeContext(req)
    context.registered = true
    context.manager_flag = user.manager_flag
    context.group_id = user.group_id

    const validation = yield Validator.validateAll(context, rules)
    if (validation.fails()) {
      return this.httpService.failed(res, {error: validation.messages()}, 403)
    }
    user.fill(context)
    yield user.save()
    yield this.tokenService.deleteUrlToken(user.id)
    res.redirect('/login')
  }
}

module.exports = RegisterController