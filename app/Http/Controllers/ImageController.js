const HttpService = require('../../Service/HttpService')
const ImgService = require('../../Service/ImageService')
const uid = require('rand-token').uid
const fs = require('fs')

class ImageController {
  constructor () {
    this.httpService = new HttpService()
    this.imgService = new ImgService()
  }

  * resize (req, res) {
    const img = req.file('thumbnail')
    const token = uid(16)
    const randPath = `/tmp/${token}.${img.extension()}`

    yield this.imgService.resize(img.tmpPath(), randPath)

    yield fs.readFile(randPath, 'base64',(err, data) => {
      if (err) {
        return this.httpService.failed(res, {error: err})
      }
      const dataUrl = `data:${img.mimeType()};base64,${data}`
      return this.httpService.success(res, {dataUrl: dataUrl})
    })
  }
}
module.exports = ImageController
