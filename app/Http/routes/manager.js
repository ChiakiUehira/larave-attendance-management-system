const Route = use('Route')

module.exports = Route.group('manager', () => {
  Route.post('/invite', '/Manager/InviteController.store')
  Route.get('/invite', '/Manager/InviteController.index')
  Route.get('/attendance', 'AttendanceController.limited')
  Route.get('/attendance/:id', 'AttendanceController.index')
}).prefix('api/v1/manager').middleware('auth')
