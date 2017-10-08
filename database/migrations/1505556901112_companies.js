'use strict'

const Schema = use('Schema')

class CompaniesTableSchema extends Schema {
  up () {
    this.create('companies', (table) => {
      table.increments()
      table.string('company_name').notNullable()
      table.string('company_name_kana').notNullable()
      table.string('address').notNullable()
      table.string('tel').notNullable()
      table.string('email').notNullable()
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('companies')
  }
}

module.exports = CompaniesTableSchema
