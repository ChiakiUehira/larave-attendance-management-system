const RestModel = require('../Model/Rest')

class RestService {
  * start (attendance, context){
    const rest = new RestModel(context)
    yield attendance.rest().save(rest)
    return rest
  }

  * end (attedance, context){
    const lastRested = yield RestModel
      .query()
      .where('attendance_id', attedance.id)
      .where('ended_at', null)
      .last()
    if (lastRested) {
      lastRested.fill(context)
      yield lastRested.save()
      return lastRested
    }
    const rest = new RestModel(context)
    yield attedance.rest().save(lastRested)
    return rest
  }
}

module.exports = RestService