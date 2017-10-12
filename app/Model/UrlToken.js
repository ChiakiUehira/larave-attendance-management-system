'use strict'

const Lucid = use('Lucid')

class UrlToken extends Lucid {

  static get table () {
    return 'url_tokens'
  }
  static get deleteTimestamp () {
    return 'deleted_at'
  }
  user() {
    return this.hasOne('App/Model/User')
  }
}

module.exports = UrlToken
