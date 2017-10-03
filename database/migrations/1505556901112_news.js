'use strict'

const Schema = use('Schema')

class NewsTableSchema extends Schema {
  up () {
    this.create('news', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.string('detail')
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('news')
  }
}

module.exports = NewsTableSchema


