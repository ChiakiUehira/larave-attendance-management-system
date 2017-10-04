const Route = use('Route')

module.exports = Route.group('attendance', () => {
  Route.get('/attendance', 'AttendanceController.index')
}).prefix('api/v1')
