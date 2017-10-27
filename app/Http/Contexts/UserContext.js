const moment = require('moment')

class UserContext {
  storeRules () {
    return {
      password: 'required',
      email: 'required|email',
      last_name: 'required',
      first_name: 'required',
      gender: 'required',
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

  storeContext (req) {
    return {
      password: req.input('password'),
      email: req.input('email'),
      tel: req.input('tel'),
      last_name: req.input('last_name'),
      first_name: req.input('first_name'),
      last_name_kana: req.input('last_name_kana'),
      first_name_kana: req.input('first_name_kana'),
      gender: req.input('gender'),
      birthday: req.input('birthday') ? moment(req.input('birthday')).format() : null,
      thumbnail: req.input('thumbnail'),
      manager_flag: req.input('manager_flag'),
      position: req.input('position'),
      address: req.input('address'),
      postal_code: req.input('postal_code'),
      group_id: req.input('group_id')
    }
  }

  updateContext (req) {
    return {
      tel: req.input('tel'),
      last_name: req.input('last_name'),
      first_name: req.input('first_name'),
      last_name_kana: req.input('last_name_kana'),
      first_name_kana: req.input('first_name_kana'),
      gender: req.input('gender'),
      birthday: req.input('birthday') ? moment(req.input('birthday')).format() : null,
      thumbnail: req.input('thumbnail'),
      position: req.input('position'),
      address: req.input('address'),
      postal_code: req.input('postal_code'),
      password: req.input('password') ? req.input('password') : ''
    }
  }

  returnContext (user) {
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
      postal_code: user.postal_code,
      email: user.email,
      password: ''
    }
  }
}
module.exports = UserContext
