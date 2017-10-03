'use strict'

const Lucid = use('Lucid')

class Leaving extends Lucid {
  static get table () {
    return 'leaving'
  }
}

module.exports = Leaving
