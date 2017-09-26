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

Route.group('api', ()=>{

  Route.post('/auth', 'AuthController.login')

  Route.get('/article', 'ArticleController.index')
  Route.get('/article/:id', 'ArticleController.show')

}).prefix('api/v1')

Route.group('api auth', ()=>{

  Route.post('/article', 'ArticleController.store')
  Route.put('/article/:id', 'ArticleController.update')
  Route.delete('/article/:id', 'ArticleController.destroy')

}).prefix('api/v1').middleware('auth')