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
    return urltoken
  }

  * hasUrlToken(id,token){
    const user = yield User.find(id)
    const urlToken = yield user.urlToken().fetch()
    return urlToken.token === token
  }
}

module.exports = TokenService
