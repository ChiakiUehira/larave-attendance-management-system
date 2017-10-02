'use strict'

const Lucid = use('Lucid')

class Attendance extends Lucid {
  static get deleteTimestamp () {
    return 'deleted_at'
  }
}

module.exports = Attendance
