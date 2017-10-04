
const AttendanceContext = require('../Contexts/AttendanceContext')

class AttendanceController {
  constructor () {
    this.attendanceContext = new AttendanceContext()
  }
  * index (req, res) {
    const context = this.attendanceContext.indexContext(req)
    res.json(context)
  }
}

module.exports = AttendanceController
