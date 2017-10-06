'use strict'

const Schema = use('Schema')

class NewsTableSchema extends Schema {
  up () {
    this.create('news', (table) => {
      table.increments()
      table.integer('company_id').unsigned()
      table.text('title').notNullable()
      table.text('detail').notNullable()
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('news')
  }
}

module.exports = NewsTableSchema
