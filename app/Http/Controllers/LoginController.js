const UserModel = use('App/Model/User')
const HttpService = require('../../Service/HttpService')

class LoginController {
  constructor () {
    this.httpService = new HttpService()
  }
  * login (req, res) {
    try {
      const { email, password } = req.post()
      yield req.auth.validate(email, password)
      const isAuth = yield req.auth.attempt(email, password)
      if (isAuth) {
        const user = yield UserModel.query().where('email', email).first()
        // todo userのregestered が false だったら本登録画面にリダイレクト
        const token = yield req.auth.generate(user)
        return this.httpService.success(res, {user, token})
      }
      return this.httpService.failed(res, {error: 'NO'}, 401)
    } catch (e) {
      return this.httpService.failed(res, {error: 'NO'}, 401)
    }
  }
}

module.exports = LoginController
