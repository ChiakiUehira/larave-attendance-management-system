'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('last_name')
      table.string('first_name')
      table.string('last_name_kana')
      table.string('first_name_kana')
      table.dateTime('birthday')
      table.string('gender')
      table.string('tel')
      table.string('manager_flag')
      table.text('thumbnail')
      table.string('email')
      table.string('password')
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UsersTableSchema


