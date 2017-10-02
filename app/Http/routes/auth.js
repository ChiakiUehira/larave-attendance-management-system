const Route = use('Route')

module.exports = Route.group('auth', () => {
  Route.post('/login', 'AuthController.login')
  Route.get('/logout', 'AuthController.logout')
}).prefix('api/v1')
