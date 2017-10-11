const Route = use('Route')

module.exports = Route.group('auth', () => {
  Route.post('/login', 'LoginController.login')
}).prefix('api/v1')

