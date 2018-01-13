'use strict'

const UserModel = use('App/Model/User')
const Hash = use('Hash')

class UserService {
  * fetchInvitingUser (company) {
    const users = yield company.users().where('registered', false).fetch()
    return users
  }

  * fetchUsersFromUser (user) {
    const company = yield user.company().first()
    const users = yield company.users().registered().with('group').fetch()
    return users
  }

  * fetchUsersHasAttendance (user) {
    const company = yield user.company().first()
    const users = yield company
      .users()
      .registered()
      .with('group', 'attendances')
      .scope('attendances', (builder) => {
        builder.orderBy('updated_at', 'desc') // todo 最新の一件だけ取得
        builder.with('rest').scope('rest', (builder) => {
          builder.orderBy('updated_at', 'desc') // todo　最新の一件だけ取得
        })
      })
      .fetch()

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

    if (!context.password) {
      context.password = user.password
    } else {
      context.password = yield Hash.make(context.password)
    }

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
