'use strict'

const Schema = use('Schema')

class CompaniesTableSchema extends Schema {
  up () {
    this.create('companies', (table) => {
      table.increments()
      table.string('company_name')
      table.string('company_name_kana')
      table.string('tel')
      table.string('email')
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('companies')
  }
}

module.exports = CompaniesTableSchema