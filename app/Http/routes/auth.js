const Route = use('Route')

Route.group('api', () => {
  Route.post('/login', 'AuthController.login')
  Route.get('/logout', 'AuthController.logout')
}).prefix('api/v1')
