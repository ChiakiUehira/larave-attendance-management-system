'use strict'

const UserModel = use('App/Model/User')

class UserService {
  * fetchUsersFromUser (user) {
    const company = yield user.company().first()
    const users = yield company.users().fetch()
    return users
  }

  * getUserById (id) {
    const user = yield UserModel.find(id)
    return user
  }

  * store (company, context) {
    const user = new UserModel(context)
    if (user) {
      yield company.users().save(user)
      return user
    } else {
      return {}
    }
  }

  * update (id, context) {
    const user = yield this.getUserById(id)
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
