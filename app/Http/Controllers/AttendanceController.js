
const AttendanceService = require('../../Service/AttendanceService')
const AttendanceContext = require('../Contexts/AttendanceContext')
const CompanyService = require('../../Service/CompanyService')

class AttendanceController {
  constructor () {
    this.attendanceService = new AttendanceService()
    this.attendanceContext = new AttendanceContext()
    this.companyService = new CompanyService()
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
  * show (req, res) {
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const isContain = yield this.companyService.checkSomeCompany(loginUser, id)
    if (!isContain) {
      res.json({
        success: false,
        attendance: null
      })
      return
    }
    const attendance = yield this.attendanceService.getById(id)
    if (attendance) {
      res.json({
        success: true,
        attendance
      })
    } else {
      res.json({
        success: false,
        attendance
      })
    }
  }
}

module.exports = AttendanceController
