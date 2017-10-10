class HttpService {
  * success (res, payload = null) {
    yield res.status(200).json({
      success: true,
      ...payload
    }).then(() => true).catch(() => false)
  }
  * failed (res, payload = null, statusCode = 404) {
    yield res.status(statusCode).json({
      success: false,
      ...payload
    }).then(() => true).catch(() => false)
  }
}

module.exports = HttpService
