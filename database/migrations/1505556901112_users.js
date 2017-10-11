'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.integer('company_id').unsigned()
      table.string('last_name')
      table.string('first_name')
      table.string('last_name_kana')
      table.string('first_name_kana')
      table.dateTime('birthday')
      table.string('gender')
      table.string('tel')
      table.string('manager_flag').notNullable()
      table.text('thumbnail')
      table.string('email').notNullable()
      table.string('salary_type')
      table.string('salary')
      table.string('position')
      table.string('address')
      table.string('postal_code')
      table.string('bank_account')
      table.string('bank_name')
      table.string('bank_branch')
      table.string('password').notNullable()
      table.boolean('registered').defaultTo(false)
      table.timestamps()
      table.softDeletes()

    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UsersTableSchema
