'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

require('./routes/login')

require('./routes/user')
require('./routes/company')
require('./routes/attendance')
require('./routes/rest')
require('./routes/news')
require('./routes/manager')
require('./routes/group')
require('./routes/image')
require('./routes/log')
