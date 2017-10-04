
const attendanceModel = use('App/Model/Attendance')

class AttendanceService {
  * search (user, context) {
    const attendances = yield attendanceModel
      .query()
      .where('user_id', user.id)
      .whereBetween('started_at', [context.from, context.to])
    return attendances
  }
  * getById (id) {
    const attendance = yield attendanceModel.find(id)
    return attendance
  }
}

module.exports = AttendanceService
