const Route = use('Route')

module.exports = Route.group('user', () => {
  Route.get('/user', 'UserController.index')
  Route.get('/user/:id', 'UserController.show')
  Route.delete('/user/:id', 'UserController.destroy')
}).prefix('api/v1')
