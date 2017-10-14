const Route = use('Route')

module.exports = Route.group('company', () => {
  Route.get('/groups', 'GroupController.index')//todo testかく
}).prefix('api/v1').middleware('auth')
