const Route = use('Route')

module.exports = Route.group('user', () => {
  Route.get('/me', 'UserController.me')
  Route.get('/user', 'UserController.index')
  Route.post('/user', 'UserController.store')
  Route.post('/user/password', 'UserController.passwordCheck')
  Route.put('/user/password', 'UserController.passwordUpdate')
  Route.get('/user/:id', 'UserController.show')
  Route.put('/user/:id', 'UserController.update')
  Route.delete('/user/:id', 'UserController.destroy')
}).prefix('api/v1').middleware('auth')
