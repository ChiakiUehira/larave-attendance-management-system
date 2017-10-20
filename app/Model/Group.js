'use strict'

const Lucid = use('Lucid')

class Group extends Lucid {
  static get deleteTimestamp () {
    return 'deleted_at'
  }

  users () {
    return this.hasMany('App/Model/User')
  }
  company () {
    return this.belongsTo('App/Model/Company')
  }
}

module.exports = Group
