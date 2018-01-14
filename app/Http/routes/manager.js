const Route = use('Route')

module.exports = Route.group('manager', () => {
  Route.post('/invite', '/Manager/InviteController.store')
  Route.get('/invite', '/Manager/InviteController.index')
  Route.get('/attendance', 'ManagerAttendanceController.index')
  Route.get('/attendance/:id', 'ManagerAttendanceController.byUser')
  Route.get('/attendance/:id/getByDate', 'ManagerAttendanceController.getByDate')
  Route.delete('/attendance/:userId/:id', 'ManagerAttendanceController.destroy')

  Route.delete('/rest/:userId/:id', 'ManagerRestController.destroy')
}).prefix('api/v1/manager').middleware('auth')
