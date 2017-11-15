'use strict'

const Lucid = use('Lucid')

class Rest extends Lucid {
  static get table () {
    return 'rest'
  }
}

module.exports = Rest
