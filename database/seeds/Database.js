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
const FactoryService = require('../service/FactoryService')
const service = new FactoryService()

const User = use('App/Model/User')
const Company = use('App/Model/Company')
const News = use('App/Model/News')
const Group = use('App/Model/Group')
const Attendance = use('App/Model/Attendance')
const Log = use('App/Model/Log')

class DatabaseSeeder {
  * run () {
    yield service.create(Company, path.join('database/static/companies.csv'))
    yield service.create(Group, path.join('database/static/groups.csv'))
    yield service.create(User, path.join('database/static/users.csv'))
    yield service.create(News, path.join('database/static/news.csv'))
    yield service.create(Attendance, path.join('database/static/attendance.csv'))
    yield service.create(Log, path.join('database/static/logs.csv'))
  }
}

module.exports = DatabaseSeeder
