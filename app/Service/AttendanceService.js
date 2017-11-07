
const AttendanceModel = use('App/Model/Attendance')

class AttendanceService {
  * search (user, context) {
    const attendances = yield AttendanceModel
      .query()
      .where('user_id', user.id)
      .whereBetween('started_at', [context.from, context.to])
      .fetch()
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
  * end (user, context) {
    const lastAttendance = yield AttendanceModel
      .query()
      .where('user_id', user.id)
      .where('ended_at', null)
      .last()
    if (lastAttendance) {
      lastAttendance.fill(context)
      yield lastAttendance.save()
      return lastAttendance
    }
    const attendance = new AttendanceModel(context)
    yield user.attendances().save(attendance)
    return attendance
  }
}

module.exports = AttendanceService
