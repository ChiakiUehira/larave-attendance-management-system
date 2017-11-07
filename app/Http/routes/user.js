const Route = use('Route')

module.exports = Route.group('user', () => {
  Route.get('/me', 'UserController.me')
  Route.get('/user', 'UserController.index')
  Route.post('/user', 'UserController.store')
  Route.get('/user/:id', 'UserController.show')
  Route.put('/user/:id', 'UserController.update')
  Route.delete('/user/:id', 'UserController.destroy')
  Route.post('/user/password', 'UserController.passWordCheck')
}).prefix('api/v1').middleware('auth')
