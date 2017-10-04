'use strict'

const UserModel = use('App/Model/User')

class UserService {
  * fetchUsersFromUser (user) {
    const company = yield user.company().first()
    const users = yield company.users().fetch()
    return users
  }

  * getById (id) {
    const user = yield UserModel.find(id)
    return user
  }

  * store (company, context) {
    const user = new UserModel(context)
    yield company.users().save(user)
    return user
  }

  * update (id, context) {
    const user = yield this.getById(id)
    if (user) {
      user.fill(context)
      yield user.save()
      return user
    } else {
      return {}
    }
  }
}

module.exports = UserService
