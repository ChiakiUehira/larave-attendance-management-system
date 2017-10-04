
const attendanceModel = use('App/Model/Attendance')

class AttendanceService {
  * search (user, context) {
    const attendances = yield attendanceModel
      .query()
      .where('user_id', user.id)
      .whereBetween('started_at', [context.from, context.to])
    return attendances
  }
}

module.exports = AttendanceService
