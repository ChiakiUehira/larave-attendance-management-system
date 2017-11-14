'use strict'

class JobController {

  constructor (socket, request) {
    this.socket = socket
  }

  onUser(id){
      this.socket.on(id, (state) => {
        this.socket.toEveryone().emit(id, state)
      })
  }
}

module.exports = JobController