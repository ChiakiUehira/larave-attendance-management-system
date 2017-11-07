const Route = use('Route')

module.exports = Route.group('group', () => {
  // todo testかく
  Route.get('/group', 'GroupController.index')
  Route.post('/group', 'GroupController.store')
}).prefix('api/v1').middleware('auth')
