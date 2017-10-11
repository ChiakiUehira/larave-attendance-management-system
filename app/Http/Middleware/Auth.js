const HttpService = require('../../Service/HttpService')
class Auth {
  constructor () {
    this.httpService = new HttpService()
  }
  * handle (req, res, next) {
    const isLogin = yield req.auth.check()
    if (!isLogin) {
      return this.httpService.failed(res, {error: "can't grant access"}, 401)
    }
    yield next
  }
}

module.exports = Auth
