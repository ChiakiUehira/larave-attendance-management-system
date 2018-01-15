const Route = use('Route')

module.exports = Route.group('manager', () => {
  Route.post('/invite', '/Manager/InviteController.store')
  Route.get('/invite', '/Manager/InviteController.index')
  Route.get('/attendance', 'ManagerAttendanceController.index')
  Route.get('/attendance/:id', 'ManagerAttendanceController.byUser')
  Route.get('/attendance/:id/getByDate', 'ManagerAttendanceController.getByDate')
  Route.put('/attendance/:userId/:id', 'ManagerAttendanceController.update')
  Route.delete('/attendance/:userId/:id', 'ManagerAttendanceController.destroy')

  Route.post('/rest/:userId/:id', 'ManagerRestController.store')
  Route.put('/rest/:userId/:id', 'ManagerRestController.update')
  Route.delete('/rest/:userId/:id', 'ManagerRestController.destroy')
}).prefix('api/v1/manager').middleware('auth')
