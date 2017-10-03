'use strict'

const Lucid = use('Lucid')

class Label extends Lucid {
  static get deleteTimestamp () {
    return 'deleted_at'
  }
  company () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = Label
