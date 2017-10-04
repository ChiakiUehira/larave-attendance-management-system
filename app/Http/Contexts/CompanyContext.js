
class CompanyContext {
  storeRules () {
    return {
      company_name: 'required',
      company_name_kana: 'required'
    }
  }
  storeContext (req) {
    return {
      company_name: req.input('company_name'),
      company_name_kana: req.input('company_name_kana'),
      address: req.input('address'),
      tel: req.input('tel'),
      email: req.input('email')
    }
  }
}

module.exports = CompanyContext
