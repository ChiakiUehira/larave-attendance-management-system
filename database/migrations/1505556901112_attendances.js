'use strict'

const Schema = use('Schema')

class AttendancesTableSchema extends Schema {
  up () {
    this.create('attendances', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.dateTime('started_at').notNullable()
      table.dateTime('ended_at')
      table.text('memo')
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('attendances')
  }
}

module.exports = AttendancesTableSchema
