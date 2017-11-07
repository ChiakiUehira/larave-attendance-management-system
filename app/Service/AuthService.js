class AuthService {
  * passwordCheck (req, email, password) {
    try {
      return yield req.auth.validate(email, password)
    } catch (e) {
      return false
    }
  }
}

module.exports = AuthService
