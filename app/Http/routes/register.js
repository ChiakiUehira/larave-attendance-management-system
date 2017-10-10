const Route = use('Route')

module.exports =  Route.group('register', () => {
  Route.get('/register', 'RegisterController.index')
  Route.post('/register', 'RegisterController.store')
})