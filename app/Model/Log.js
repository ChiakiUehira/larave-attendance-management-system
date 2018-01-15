'use strict'

const Lucid = use('Lucid')

class Log extends Lucid {

  user () {
    return this.belongsTo('App/Model/User')
  }
  company (){
    return this.belongsTo('App/Model/Company')
  }
}

module.exports = Log
