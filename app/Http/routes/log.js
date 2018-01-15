const Route = use('Route')

module.exports = Route.group('log', () => {
  Route.get('/log', 'LogController.index')
  Route.get('/log/:id', 'LogController.show')
}).prefix('api/v1').middleware('auth')