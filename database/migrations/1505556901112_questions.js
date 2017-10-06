'use strict'

const Schema = use('Schema')

class QuestionsTableSchema extends Schema {
  up () {
    this.create('questions', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.string('title').notNullable()
      table.string('text').notNullable()
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('questions')
  }
}

module.exports = QuestionsTableSchema


