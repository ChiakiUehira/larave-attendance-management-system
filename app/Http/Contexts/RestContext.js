const moment = require('moment')

class UserContext {
  startContext (req) {
    return {
      started_at: moment().format('YYYY-MM-DD HH:mm'),
      ended_at: null,
    }
  }
  endContext (req) {
    return {
      ended_at: moment().format('YYYY-MM-DD HH:mm'),
    }
  }
}

module.exports = UserContext