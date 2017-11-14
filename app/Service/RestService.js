const RestModel = require('../Model/Rest')

class RestService {
  * start (user, context){
    const rest = new RestModel(context)
    yield user.rest().save(rest)
    return rest
  }

  * end (user, context){
    const lastRested = yield RestModel
      .query()
      .where('user_id', user.id)
      .where('ended_at', null)
      .last()
    if (lastRested) {
      lastRested.fill(context)
      yield lastRested.save()
      return lastRested
    }
    const rest = new RestModel(context)
    yield user.rest().save(lastRested)
    return rest
  }
}

module.exports = RestService