const Route = use('Route')

Route.group('api', () => {
  Route.get('/user', 'UserController.index')
  Route.get('/user/:id', 'UserController.show')
  Route.delete('/user/:id', 'UserController.destroy')
}).prefix('api/v1')
