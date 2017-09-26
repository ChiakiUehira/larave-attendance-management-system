'use strict'

class Auth {

  * handle (req, res, next) {

    const isLogin = yield req.auth.check()
    if (!isLogin) {
       res.json({errer: 'NO'})
       return
    }

    yield next
  }

}

module.exports = Auth
