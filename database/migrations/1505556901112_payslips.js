'use strict'

const Schema = use('Schema')

class PayslipsTableSchema extends Schema {
  up () {
    this.create('payslips', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('payslips')
  }
}

module.exports = PayslipsTableSchema


