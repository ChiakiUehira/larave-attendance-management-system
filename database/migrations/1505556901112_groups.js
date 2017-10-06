'use strict'

const Schema = use('Schema')

class GroupsTableSchema extends Schema {
  up () {
    this.create('groups', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('detail')
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('groups')
  }
}

module.exports = GroupsTableSchema


