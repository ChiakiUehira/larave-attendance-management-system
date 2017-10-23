
const AttendanceModel = use('App/Model/Attendance')

class AttendanceService {
  * search (user, context) {
    const attendances = yield AttendanceModel
      .query()
      .where('user_id', user.id)
      .whereBetween('started_at', [context.from, context.to])
    return attendances
  }
  * getById (id) {
    const attendance = yield AttendanceModel.find(id)
    return attendance
  }
  * contains (user, id) {
    const attendances = yield user.attendances().fetch()
    return attendances.some((attendance) => {
      return attendance.id === Number(id)
    })
  }
  * start (user, context) {
    const attendance = new AttendanceModel(context)
    yield user.attendances().save(attendance)
    return attendance
  }
}

module.exports = AttendanceService
