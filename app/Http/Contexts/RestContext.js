const moment = require('moment')

class RestContext {
  startContext (req) {
    return {
      started_at: moment().format('YYYY-MM-DD HH:mm'),
      ended_at: null
    }
  }
  endContext (req) {
    return {
      ended_at: moment().format('YYYY-MM-DD HH:mm')
    }
  }
  updateRules () {
    return {
      started_at: 'required',
      ended_at: 'required'
    }
  }
  updateContext (req) {
    return {
      started_at: moment(req.input('started_at')).format('YYYY-MM-DD HH:mm'),
      ended_at: moment(req.input('ended_at')).format('YYYY-MM-DD HH:mm')
    }
  }
}

module.exports = RestContext
