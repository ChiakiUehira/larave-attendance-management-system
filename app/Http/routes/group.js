const Route = use('Route')

module.exports = Route.group('group', () => {
  // todo testかく
  Route.get('/group', 'GroupController.index')
  Route.post('/group', 'GroupController.store')
  Route.delete('/group/:id', 'GroupController.destroy')
}).prefix('api/v1').middleware('auth')
