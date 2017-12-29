const Route = use('Route')

module.exports = Route.group('user', () => {
  Route.get('/me', 'UserController.me')
  Route.get('/user', 'UserController.index')
  Route.post('/user', 'UserController.store')
  Route.put('/user/password', 'UserController.passwordUpdate')
  Route.put('/user/group', 'UserController.groupUpdate')
  Route.get('/user/:id', 'UserController.show')
  Route.put('/user/:id', 'UserController.update')
  Route.delete('/user/:id', 'UserController.destroy')
}).prefix('api/v1').middleware('auth')
