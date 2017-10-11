const Validator = use('Validator')
const User = use('App/Model/User')

class RegisterController {

  * index (req, res) {
    //todo urlについてるトークン検証
    //todo urlについてるuser_id からデータをとってきて返す
    yield res.sendView('register')
  }

  * store (req, res) {
    //todo 本登録する
    res.redirect('/login')
  }
}

module.exports = RegisterController
