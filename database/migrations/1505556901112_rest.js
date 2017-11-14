'use strict'

const Schema = use('Schema')

class LeavingTableSchema extends Schema {
  up () {
    this.create('rest', (table) => {
      table.increments()
      table.integer('attendance_id')
      table.string('type')
      table.text('detail')
      table.text('comment')
      table.dateTime('started_at').notNullable()
      table.dateTime('ended_at')
      table.timestamps()
    })
  }

  down () {
    this.drop('rest')
  }
}

module.exports = LeavingTableSchema
