const Route = use('Route')

module.exports = Route.group('rest', () => {
  Route.post('/rest/start', 'RestController.start')
  Route.post('/rest/end', 'RestController.end')
}).prefix('api/v1').middleware('auth')
