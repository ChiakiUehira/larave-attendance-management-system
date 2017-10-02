const UserModel = use('App/Model/User')

class AuthController {
  * login (req, res) {
    try {
      const { email, password } = req.post()
      yield req.auth.validate(email, password)
      const isAuth = yield req.auth.attempt(email, password)
      console.log(isAuth)
      if (isAuth) {
        const user = yield UserModel.query().where('email', email).first()
        const token = yield req.auth.generate(user)
        return res.json({success: true, user, token})
      }
      return res.json({success: false})
    } catch (e) {
      res.unauthorized({success: false, error: e.message})
    }
  }

  * logout (req, res) {
  }
}

module.exports = AuthController
