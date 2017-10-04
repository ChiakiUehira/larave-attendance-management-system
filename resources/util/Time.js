
const m = require('moment')
const DEFAULT_FORMAT = 'YYYY-MM-DD'

exports.isAccept = (date) => {
  return m(date).format(DEFAULT_FORMAT) !== 'Invalid date'
}
