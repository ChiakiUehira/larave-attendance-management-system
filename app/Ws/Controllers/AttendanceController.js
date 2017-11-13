'use strict'

class AttendanceController {

  constructor (socket, request) {
    this.socket = socket
  }

  onUsers(users){
    users.forEach((user) => {
      this.socket.on(user.id, (state) => {
        this.socket.toEveryone().emit(user.id, state)
      })
    })
  }
}

module.exports = AttendanceController