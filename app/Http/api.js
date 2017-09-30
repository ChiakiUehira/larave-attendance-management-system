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

const Route = use('Route')

Route.group('api', () => {
  Route.post('/auth', 'AuthController.login')
  Route.get('/article', 'ArticleController.index')
  Route.get('/article/:id', 'ArticleController.show')
  Route.post('/article', 'ArticleController.store')
  Route.put('/article/:id', 'ArticleController.update')
  Route.delete('/article/:id', 'ArticleController.destroy')
  Route.get('/user', 'UserController.index')
  Route.get('/user/:id', 'UserController.show')
  Route.delete('/user/:id', 'UserController.destroy')
}).prefix('api/v1')
