'use strict'

const UserModel = use('App/Model/User')

class UserService {
  * fetchUsersFromUser (user) {
    const company = yield user.company().first()
    const users = yield company.users().with('group').fetch()
    return users
  }

  * getById (id) {
    const user = yield UserModel.query().where('id', Number(id)).with('group').first()
    return user
  }
  * getByEmail (email) {
    const user = yield UserModel.findBy('email', email)
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
