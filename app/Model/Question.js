'use strict'

const Lucid = use('Lucid')

class Question extends Lucid {
  static get deleteTimestamp () {
    return 'deleted_at'
  }
}

module.exports = Question
