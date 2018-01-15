const RestModel = require('../Model/Rest')

class RestService {
  * start (attendance, context) {
    const rest = new RestModel(context)
    yield attendance.rest().save(rest)
    return rest
  }

  * end (attendance, context) {
    const lastRested = yield RestModel
      .query()
      .where('attendance_id', attendance.id)
      .where('ended_at', null)
      .last()
    if (lastRested) {
      lastRested.fill(context)
      yield lastRested.save()
      return lastRested
    }
    const rest = new RestModel(context)
    yield attendance.rest().save(lastRested)
    return rest
  }

  * lastUpdated (attendance) {
    const rest = yield RestModel
      .query()
      .where('attendance_id', attendance.id)
      .orderBy('updated_at', 'desc')
      .first()
    return rest
  }

  * getById (id) {
    const rest = yield RestModel.query().where('id', Number(id)).first()
    return rest
  }

  * update (id, context) {
    const rest = yield this.getById(id)
    if (rest) {
      rest.fill(context)
      yield rest.save()
      return rest
    } else {
      return {}
    }
  }

  * store (attendance, context) {
    const rest = new RestModel(context)
    yield attendance.rest().save(rest)
    return rest
  }

  // * contains (user, id) {
  //   const rests = yield user.attendances().fetch()
  //   return rests.some((rest) => {
  //     return rest.id === Number(id)
  //   })
  // }
}

module.exports = RestService
