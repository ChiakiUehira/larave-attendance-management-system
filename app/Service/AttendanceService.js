const AttendanceModel = use('App/Model/Attendance')
const moment = require('moment')
class AttendanceService {
  * search (user, context) {
    const attendancesByStartedAt = yield AttendanceModel
      .query()
      .where('user_id', user.id)
      .whereBetween('started_at', [context.from, moment(context.to).add(1, 'day').format('YYYY-MM-DD')])
      .with('rest')
      .fetch()
    const attendancesByEndedAt = yield AttendanceModel
      .query()
      .where('user_id', user.id)
      .whereBetween('ended_at', [context.from, moment(context.to).add(1, 'day').format('YYYY-MM-DD')])
      .with('rest')
      .fetch()
    return [
      ...attendancesByStartedAt,
      ...attendancesByEndedAt.filter(self => !attendancesByStartedAt.find(oth => oth.id === self.id))
    ]
  }

  * getById (id) {
    const attendance = yield AttendanceModel.query().where('id', Number(id)).with('rest').first()
    return attendance
  }

  * getByDate (user, context) {
    const attendancesByStartedAt = yield AttendanceModel
      .query()
      .where('user_id', user.id)
      .whereBetween('started_at', [context.date, moment(context.date).add(1, 'day').format('YYYY-MM-DD')])
      .with('rest')
      .fetch()
    const attendancesByEndedAt = yield AttendanceModel
      .query()
      .where('user_id', user.id)
      .whereBetween('ended_at', [context.date, moment(context.date).add(1, 'day').format('YYYY-MM-DD')])
      .with('rest')
      .fetch()
    return [
      ...attendancesByStartedAt,
      ...attendancesByEndedAt.filter(self => !attendancesByStartedAt.find(oth => oth.id === self.id))
    ]
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

  * lastUpdated (user) {
    const attendance = yield AttendanceModel
      .query()
      .where('user_id', user.id)
      .orderBy('updated_at', 'desc')
      .first()
    return attendance
  }
}

module.exports = AttendanceService
