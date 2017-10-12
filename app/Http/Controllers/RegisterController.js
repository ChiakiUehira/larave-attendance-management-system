const Validator = use('Validator')
const User = use('App/Model/User')
const UserService = require('../../Service/UserService')
const TokenServce = require('../../Service/TokenService')
const HttpService = require('../../Service/HttpService')

class RegisterController {

  constructor () {
    this.userService = new UserService()
    this.tokenService = new TokenServce()
    this.httpService = new HttpService()
  }

  * index (req, res) {
    const id = req.input('id')
    const token = req.input('t')
    const user = yield this.userService.getById(id)

    const hasUrlToken = yield this.tokenService.hasUrlToken(id,token)
    if (!hasUrlToken) {
      return this.httpService.failed(res, {error: 'Forbidden'}, 403)
    }

    if (user) {
      yield res.sendView('register', {user: user})
    } else {
      return this.httpService.failed(res, {error: 'Forbidden'}, 403)
    }
  }

  * store (req, res) {
    //todo 本登録する
    res.redirect('/login')
  }
}

module.exports = RegisterController
