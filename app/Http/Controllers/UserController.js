const UserModel = use('App/Model/User')

class UserController {
  * index (req, res) {
    const users = yield UserModel.all()
    res.json(users)
  }
}

module.exports = UserController
