'use strict'

const Lucid = use('Lucid')

class UrlToken extends Lucid {

  static get table () {
    return 'url_tokens'
  }
  user() {
    return this.hasOne('App/Model/User')
  }
}

module.exports = UrlToken
