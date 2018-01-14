'use strict'

const Lucid = use('Lucid')

class Log extends Lucid {

  user () {
    return this.hasOne('App/Model/User')
  }
}

module.exports = Log
