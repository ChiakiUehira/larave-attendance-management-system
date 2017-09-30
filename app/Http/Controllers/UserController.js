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
  * destroy (req, res) {
    try {
      const id = req.param('id')
      const user = yield UserModel.find(id)
      yield user.delete()
      res.json({user})
    } catch (error) {
      throw error
    }
  }
}

module.exports = UserController
