const UserService = require('../../Service/UserService')
const CompanyService = require('../../Service/CompanyService')

class UserController {
  constructor () {
    this.userService = new UserService()
    this.companyService = new CompanyService()
  }
  * index (req, res) {
    const loginUser = yield req.auth.getUser()
    const users = yield this.userService.fetchUsersFromUser(loginUser)
    res.json({users})
  }
  * show (req, res) {
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const isContain = yield this.companyService.checkSomeCompany(loginUser, id)
    if (isContain) {
      const user = yield this.userService.getUserById(id)
      res.json({user})
    } else {
      res.json({user: null})
    }
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
