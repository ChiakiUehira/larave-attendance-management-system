'use strict'

const Schema = use('Schema')

class LabelsTableSchema extends Schema {
  up () {
    this.create('labels', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.string('name').notNullable()
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('labels')
  }
}

module.exports = LabelsTableSchema


