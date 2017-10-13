'use strict'

const Schema = use('Schema')

class UrlTokensTableSchema extends Schema {
  up () {
    this.create('url_tokens', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.string('token').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('url_tokens')
  }
}

module.exports = UrlTokensTableSchema
