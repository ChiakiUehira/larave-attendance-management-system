const Validator = use('Validator')
const User = use('App/Model/User')

class RegisterController {

  * index (req, res) {
    yield res.sendView('register')
  }

  * store (req, res) {
    res.redirect('/login')
  }
}

module.exports = RegisterController
