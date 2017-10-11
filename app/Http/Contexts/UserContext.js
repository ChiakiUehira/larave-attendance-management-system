
class UserContext {
  storeRules () {
    // @TODO 調整
    return {
      // password: '',
      email: 'required|email',
      // tel: '',
      last_name: 'required',
      first_name: 'required',
      last_name_kana: 'required',
      first_name_kana: 'required',
      // gender: '',
      // birthday: '',
      // thumbnail: '',
      manager_flag: 'required',
      salary_type: 'required',
      salary: 'required'
      // position: '',
      // address: '',
      // postal_code: '',
      // bank_account: '',
      // bank_name: '',
      // bank_branch: ''
    }
  }
  storeContext (req) {
    // @TODO 調整
    return {
      password: 'pw',
      email: req.input('email'),
      tel: req.input('tel'),
      last_name: req.input('last_name'),
      first_name: req.input('first_name'),
      last_name_kana: req.input('last_name_kana'),
      first_name_kana: req.input('first_name_kana'),
      gender: req.input('gender'),
      birthday: req.input('birthday'),
      thumbnail: req.input('thumbnail'),
      manager_flag: req.input('manager_flag'),
      salary_type: req.input('salary_type'),
      salary: req.input('salary'),
      position: req.input('position'),
      address: req.input('address'),
      postal_code: req.input('postal_code'),
      bank_account: req.input('bank_account'),
      bank_name: req.input('bank_name'),
      bank_branch: req.input('bank_branch')
    }
  }
}

module.exports = UserContext
