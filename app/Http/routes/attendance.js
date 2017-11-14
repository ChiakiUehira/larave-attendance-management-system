const Route = use('Route')

module.exports = Route.group('attendance', () => {
  Route.get('/attendance', 'AttendanceController.index')
  Route.get('/attendance/lastUpdated', 'AttendanceController.lastUpdated')
  Route.get('/attendance/:id', 'AttendanceController.show')
  Route.post('/attendance/start', 'AttendanceController.start')
  Route.post('/attendance/restStart', 'RestController.start')
  Route.post('/attendance/restEnd', 'RestController.end')
  Route.post('/attendance/end', 'AttendanceController.end')
}).prefix('api/v1').middleware('auth')
