const Route = use('Route')

module.exports = Route.group('user', () => {
  Route.get('/attendance', 'AttendanceController.index')
}).prefix('api/v1')
