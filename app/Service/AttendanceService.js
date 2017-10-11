
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
  * contains (user, id) {
    const attendances = yield user.attendances().fetch()
    return attendances.some((news) => {
      return attendances.id === Number(id)
    })
  }
}

module.exports = AttendanceService
