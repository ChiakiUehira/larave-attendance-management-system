'use strict'

const User = use('App/Model/User')
const uid = require('rand-token').uid
const UrlToken = require('../Model/UrlToken')

class TokenService {
  * storeUrlToken (user) {
    const urltoken = new UrlToken()
    urltoken.user_id = user.id
    urltoken.token = uid(16)
    yield urltoken.save()
    yield urltoken.user().save(user)
    return urltoken
  }

  * getUrlToken (user) {
    const urlToken = yield user.urlToken().fetch()
    return urlToken.token
  }

  * deleteUrlToken (id) {
    const user = yield User.find(id)
    if(user){
      return false
    }
    const urlToken = yield user.urlToken().fetch()
    if (urlToken) {
      yield urlToken.delete()
    }
  }
}

module.exports = TokenService
