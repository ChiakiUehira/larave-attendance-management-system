'use strict'

const Schema = use('Schema')

class UserGroupsTableSchema extends Schema {
  up () {
    this.create('user_groups', (table) => {
      table.integer('user_id').unsigned()
      table.integer('group_id').unsigned()
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('user_groups')
  }
}

module.exports = UserGroupsTableSchema


