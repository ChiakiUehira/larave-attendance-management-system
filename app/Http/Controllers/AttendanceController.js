
const AttendanceService = require('../../Service/AttendanceService')
const AttendanceContext = require('../Contexts/AttendanceContext')

class AttendanceController {
  constructor () {
    this.attendanceService = new AttendanceService()
    this.attendanceContext = new AttendanceContext()
  }
  * index (req, res) {
    const loginUser = yield req.auth.getUser()
    const context = this.attendanceContext.indexContext(req)
    const attendances = yield this.attendanceService.search(loginUser, context)
    res.json({
      success: true,
      context,
      attendances
    })
  }
}

module.exports = AttendanceController
