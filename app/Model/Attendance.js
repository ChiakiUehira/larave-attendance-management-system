'use strict'

const Lucid = use('Lucid')

class Attendance extends Lucid {
  static get deleteTimestamp () {
    return 'deleted_at'
  }
  user () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = Attendance
