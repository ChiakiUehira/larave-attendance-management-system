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
  * me (req, res) {
    const loginUser = yield req.auth.getUser()
    if (loginUser) {
      res.json({
        success: true,
        loginUser
      })
    } else {
      res.json({
        success: false,
      })
    }
  }
  * index (req, res) {
    const loginUser = yield req.auth.getUser()
    const users = yield this.userService.fetchUsersFromUser(loginUser)
    if (users) {
      res.json({
        success: true,
        users
      })
    } else {
      res.json({
        success: false,
        users: []
      })
    }
  }
  * show (req, res) {
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const isContain = yield this.companyService.checkSomeCompany(loginUser, id)
    if (!isContain) {
      res.json({
        success: false,
        user: null
      })
      return
    }
    const user = yield this.userService.getById(id)
    if (user) {
      res.json({
        success: true,
        user
      })
    } else {
      res.json({
        success: false,
        user
      })
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
      // @TODO メール送る
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
  * update (req, res) {
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const rules = this.userContext.storeRules()
    const context = this.userContext.storeContext(req)
    const validation = yield Validator.validateAll(context, rules)
    const isContain = yield this.companyService.checkSomeCompany(loginUser, id)
    if (!isContain) {
      res.json({
        success: false
      })
      return
    }
    if (validation.fails()) {
      res.json({
        success: false,
        error: validation.messages()
      })
      return
    }
    const user = yield this.userService.update(id, context)
    res.json({
      success: true,
      user
    })
  }
  * destroy (req, res) {
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const isContain = yield this.companyService.checkSomeCompany(loginUser, id)
    if (isContain) {
      const user = yield this.userService.getById(id)
      yield user.delete()
      res.json({success: true})
    } else {
      res.json({success: false})
    }
  }
}

module.exports = UserController
