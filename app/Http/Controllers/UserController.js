const UserService = require('../../Service/UserService')
const CompanyService = require('../../Service/CompanyService')
const UserContext = require('../Contexts/UserContext')

const Validator = use('Validator')

class UserController {
  constructor () {
    this.userService = new UserService()
    this.userContext = new UserContext()
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
  * store (req, res) {
    const loginUser = yield req.auth.getUser()
    const company = yield this.companyService.getCompanyFromUser(loginUser)
    const rules = this.userContext.storeRules()
    const context = this.userContext.storeContext(req)
    const validation = yield Validator.validateAll(context, rules)
    if (!validation.fails()) {
      const user = yield this.userService.store(company, context)
      res.json({
        success: true,
        user
      })
    } else {
      res.json({
        success: false,
        error: validation.messages()
      })
    }
  }
  * destroy (req, res) {
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const isContain = yield this.companyService.checkSomeCompany(loginUser, id)
    if (isContain) {
      const user = yield this.userService.getUserById(id)
      yield user.delete()
      res.json({success: true})
    } else {
      res.json({success: false})
    }
  }
}

module.exports = UserController
