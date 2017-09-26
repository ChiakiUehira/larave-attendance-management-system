'use strict'

const Schema = use('Schema')

class ArticleTableSchema extends Schema {
  up () {
    this.create('articles', (table) => {
      table.increments()
      table.string('title')
      table.string('content')
      table.timestamps()
    })
  }

  down () {
    this.drop('articles')
  }
}

module.exports = ArticleTableSchema
