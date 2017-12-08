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
    const token = yield UrlToken.findBy('token', req.input('t'))
    if (!token) {
      return this.httpService.failed(res, {error: '無効なトークン'}, 403)
    }
    const user = yield token.user().fetch()
    yield res.sendView('register', {user})
  }

  * confirm (req, res) {
    const rules = this.userContext.updateRules()
    let context = this.userContext.updateContext(req)
    const validation = yield Validator.validateAll(context, rules)
    if (validation.fails()) {
      return this.httpService.failed(res, {error: validation.messages()}, 403)
    }
    yield req.session.put({context: context})
    yield req.session.put({user_id: req.input('user_id')})

    yield res.sendView('confirm', {user: context})
  }

  * cancel (req, res) {
    const context = yield req.session.get('context')
    const user_id = yield req.session.get('user_id')
    let user = context
    user.id = user_id

    yield res.sendView('register', {user})
  }

  * store (req, res) {
    const context = yield req.session.get('context')
    const user_id = yield req.session.get('user_id')
    if(!context && !user_id){
      return this.httpService.failed(res, {error: 'もう一度操作をやり直してください'})
    }
    context.registered = true
    yield this.userService.update(user_id, context)
    yield this.tokenService.deleteUrlToken(user_id)
    res.redirect('login')
  }
}

module.exports = RegisterController
