const UserModel = use('App/Model/User')
const HttpService = require('../../Service/HttpService')
const TokenService = require('../../Service/TokenService')

class LoginController {
  constructor () {
    this.httpService = new HttpService()
    this.tokenService = new TokenService()
  }

  * login (req, res) {
    try {
      const {email, password} = req.post()
      yield req.auth.validate(email, password)
      const isAuth = yield req.auth.attempt(email, password)
      if (isAuth) {
        const user = yield UserModel.query().where('email', email).first()
        if (!user.registered) {
          const urlToken = yield this.tokenService.getUrlToken(user)
          return this.httpService.failed(res, {message: 'notRegistered', t: urlToken, id: user.id}, 401)
        }
        const token = yield req.auth.generate(user)
        return this.httpService.success(res, {user, token})
      }
      return this.httpService.failed(res, {error: 'NO'}, 401)
    } catch (e) {
      return this.httpService.failed(res, {error: e}, 401)
    }
  }
}

module.exports = LoginController
