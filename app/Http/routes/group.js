const Route = use('Route')

module.exports = Route.group('group', () => {
  // todo testかく
  Route.get('/group', 'GroupController.index')
}).prefix('api/v1').middleware('auth')
