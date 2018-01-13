const Route = use('Route')

module.exports = Route.group('rest', () => {
  Route.post('/rest/start', 'RestController.start')
  Route.post('/rest/end', 'RestController.end')
  Route.get('/rest/lastUpdated', 'RestController.lastUpdated')
}).prefix('api/v1').middleware('auth')
