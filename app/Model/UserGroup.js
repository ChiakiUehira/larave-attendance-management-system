'use strict'

const Lucid = use('Lucid')

class UserGroup extends Lucid {
  static get primaryKey () {
    return 'user_id'
  }
  static get primaryKey () {
    return 'group_id'
  }
  static get deleteTimestamp () {
    return 'deleted_at'
  }
  static get table () {
    return 'user_groups'
  }
}

module.exports = UserGroup
