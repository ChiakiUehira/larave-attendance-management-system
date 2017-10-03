'use strict'

const Lucid = use('Lucid')

class Group extends Lucid {
  static get deleteTimestamp () {
    return 'deleted_at'
  }
}

module.exports = Group
