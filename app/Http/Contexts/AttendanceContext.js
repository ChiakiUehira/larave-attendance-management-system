
const moment = require('moment')
const { isAccept } = require('../../../utils/Time')

class AttendanceContext {
  constructor () {
    this.DEFAULT_FORMAT = 'YYYY-MM-DD'
  }
  indexContext (req) {
    const from = isAccept(req.input('from')) ? moment(req.input('from')).format(this.DEFAULT_FORMAT) : moment().startOf('month').format(this.DEFAULT_FORMAT)
    const to = isAccept(req.input('to')) ? moment(req.input('to')).format(this.DEFAULT_FORMAT) : moment().format(this.DEFAULT_FORMAT)
    return {
      from: from,
      to: to
    }
  }
  startContext (req) {
    return {
      started_at: moment().format('YYYY-MM-DD HH:mm'),
      ended_at: null,
      memo: req.input('memo')
    }
  }
}

module.exports = AttendanceContext
