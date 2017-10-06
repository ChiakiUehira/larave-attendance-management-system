'use strict'

/*
|--------------------------------------------------------------------------
| Database Seeder
|--------------------------------------------------------------------------
| Database Seeder can be used to seed dummy data to your application
| database. Here you can make use of Factories to create records.
|
| make use of Ace to generate a new seed
|   ./ace make:seed [name]
|
*/

const path = require('path')
const Factory = use('Factory')
const FactoryService = require('../service/FactoryService')
const service = new FactoryService()

const User = use('App/Model/User')

class DatabaseSeeder {
  * run () {
    yield service.create(User, path.join('database/static/users.csv'))
    yield Factory.model('App/Model/Company').create(2)
    yield Factory.model('App/Model/Attendance').create(100)
    yield Factory.model('App/Model/News').create(20)
  }
}

module.exports = DatabaseSeeder
