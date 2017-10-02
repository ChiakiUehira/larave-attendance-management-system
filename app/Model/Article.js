'use strict'

const Lucid = use('Lucid')

class Article extends Lucid {
  static get deleteTimestamp () {
    return 'deleted_at'
  }
}

module.exports = Article
