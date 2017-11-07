const UserService = require('../../Service/UserService')
const CompanyService = require('../../Service/CompanyService')
const UserContext = require('../Contexts/UserContext')
const HttpService = require('../../Service/HttpService')
const Validator = use('Validator')

class UserController {
  constructor () {
    this.userService = new UserService()
    this.userContext = new UserContext()
    this.companyService = new CompanyService()
    this.httpService = new HttpService()
  }

  * me (req, res) {
    const loginUser = yield req.auth.getUser()
    const context = this.userContext.returnMeContext(loginUser)
    return this.httpService.success(res, { me: context })
  }

  * index (req, res) {
    const loginUser = yield req.auth.getUser()
    const users = yield this.userService.fetchUsersFromUser(loginUser)
    return this.httpService.success(res, { users })
  }

  * show (req, res) {
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const isContain = yield this.companyService.contains(loginUser, id)
    if (!isContain) {
      return this.httpService.failed(res, { error: 'Forbidden' }, 403)
    }
    const user = yield this.userService.getById(id)
    return this.httpService.success(res, { user })
  }

  * store (req, res) {
    const loginUser = yield req.auth.getUser()
    const company = yield this.companyService.getCompanyFromUser(loginUser)
    const rules = this.userContext.storeRules()
    const context = this.userContext.storeContext(req)
    const validation = yield Validator.validateAll(context, rules)
    if (validation.fails()) {
      return this.httpService.failed(res, { error: validation.messages() }, 403)
    }
    const user = yield this.userService.store(company, context)
    return this.httpService.success(res, { user })
  }

  * update (req, res) {
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const rules = this.userContext.updateRules()
    const context = this.userContext.updateContext(req)
    const validation = yield Validator.validateAll(context, rules)
    const isContain = yield this.companyService.contains(loginUser, id)
    if (!isContain) {
      return this.httpService.failed(res, { error: 'Forbidden' }, 403)
    }
    if (validation.fails()) {
      return this.httpService.failed(res, { error: validation.messages() }, 403)
    }
    const user = yield this.userService.update(id, context)
    return this.httpService.success(res, { user })
  }

  * destroy (req, res) {
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const isContain = yield this.companyService.contains(loginUser, id)
    if (!isContain) {
      return this.httpService.failed(res, { error: 'Forbidden' }, 403)
    }
    const user = yield this.userService.getById(id)
    yield user.delete()
    return this.httpService.success(res)
  }

  * passWordCheck (req, res) {
    const password = req.input('password')
    const { email } = yield req.auth.getUser()
    try {
      const isValid = yield req.auth.validate(email, password)
      if (isValid) {
        return this.httpService.success(res, {})
      }
    } catch (e) {
      return this.httpService.failed(res, { error: 'Password does not match' }, 403)
    }
  }
}

module.exports = UserController
