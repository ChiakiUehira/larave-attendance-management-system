const Route = use('Route')

module.exports = Route.group('register', () => {
  Route.get('/register', 'RegisterController.index')
  Route.post('/register', 'RegisterController.store')
  Route.post('/confirm', 'RegisterController.confirm')
  Route.get('/cancel', 'RegisterController.cancel')
})
