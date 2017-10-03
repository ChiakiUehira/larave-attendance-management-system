'use strict'

const Lucid = use('Lucid')

class News extends Lucid {
  static get deleteTimestamp () {
    return 'deleted_at'
  }
  static get table () {
    return 'news'
  }
}

module.exports = News
