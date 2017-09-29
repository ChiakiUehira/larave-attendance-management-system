const UserModel = use('App/Model/User')

class UserController {
  * index (req, res) {
    const users = yield UserModel.all()
    res.json({users})
  }
  * show (req, res) {
    const id = req.param('id')
    const user = yield UserModel.find(id)
    res.json({user})
  }
}

module.exports = UserController
