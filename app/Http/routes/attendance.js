const Route = use('Route')

module.exports = Route.group('attendance', () => {
  Route.get('/attendance', 'AttendanceController.index')
  Route.get('/attendance/:id', 'AttendanceController.show')
}).prefix('api/v1')
