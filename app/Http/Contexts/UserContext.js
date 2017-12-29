const moment = require('moment')

class UserContext {
  storeRules () {
    return {
      email: 'required|email',
      last_name: 'required',
      first_name: 'required',
      manager_flag: 'required',
      group_id: 'required'
    }
  }

  updateRules () {
    return {
      last_name: 'required',
      first_name: 'required',
      gender: 'required'
    }
  }

  passwordUpdateRules () {
    return {
      password: 'required',
      newPassword: 'required'
    }
  }

  //どこで使ってる？
  storeContext (req) {
    return {
      email: req.input('email'),
      last_name: req.input('last_name'),
      first_name: req.input('first_name'),
      last_name_kana: req.input('last_name_kana'),
      first_name_kana: req.input('first_name_kana'),
      manager_flag: req.input('manager_flag'),
      position: req.input('position'),
      group_id: req.input('group_id'),
      password: 'pw'
    }
  }

  inviteContext (user) {
    return {
      email: user.email,
      last_name: user.last_name,
      first_name: user.first_name,
      manager_flag: user.manager_flag,
      position: user.position,
      group_id: user.group_id,
      password: 'pw'
    }
  }

  updateContext (req) {
    return {
      tel: req.input('tel'),
      last_name: req.input('last_name'),
      first_name: req.input('first_name'),
      last_name_kana: req.input('last_name_kana'),
      first_name_kana: req.input('first_name_kana'),
      email: req.input('email'),
      gender: req.input('gender'),
      birthday: req.input('birthday') ? moment(req.input('birthday')).format() : null,
      thumbnail: req.input('thumbnail'),
      position: req.input('position'),
      address: req.input('address'),
      postal_code: req.input('postal_code'),
      password: req.input('password')
    }
  }

  passwordUpdateContext (req) {
    return {
      password: req.input('password'),
      newPassword: req.input('newPassword')
    }
  }

  groupUpdateContext (req) {
    return {
      userId: req.input('user_id'),
      groupId: req.input('group_id')
    }
  }

  returnMeContext (user) {
    return {
      id: user.id,
      tel: user.tel,
      last_name: user.last_name,
      first_name: user.first_name,
      last_name_kana: user.last_name_kana,
      first_name_kana: user.first_name_kana,
      gender: user.gender,
      birthday: user.birthday,
      thumbnail: user.thumbnail,
      position: user.position,
      address: user.address,
      manager_flag: user.manager_flag,
      postal_code: user.postal_code,
      email: user.email,
      group_id: user.group_id
    }
  }
}
module.exports = UserContext
