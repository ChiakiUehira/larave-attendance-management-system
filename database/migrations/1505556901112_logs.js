'use strict'

const Schema = use('Schema')

class LogsTableSchema extends Schema {
  up () {
    this.create('logs', (table) => {
      table.increments()
      table.string('type')
      table.integer('company_id').unsigned()
      table.integer('user_id').unsigned()
      table.text('from')
      table.text('to')
      table.timestamps()
    })
  }

  down () {
    this.drop('logs')
  }
}

module.exports = LogsTableSchema
