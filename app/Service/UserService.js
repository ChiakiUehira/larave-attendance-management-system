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
}

module.exports = UserService
