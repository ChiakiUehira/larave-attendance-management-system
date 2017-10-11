
class HttpService {
  success (res, payload = null) {
    res.status(200).json({
      success: true,
      ...payload
    })
    return true
  }
  failed (res, payload = null, statusCode = 404) {
    res.status(statusCode).json({
      success: false,
      ...payload
    })
    return false
  }
}

module.exports = HttpService
