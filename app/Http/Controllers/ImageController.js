const HttpService = require('../../Service/HttpService')
const ImgService = require('../../Service/ImageService')
const fs = require('fs')

class ImageController {
  constructor () {
    this.httpService = new HttpService()
    this.imgService = new ImgService()
  }

  * resize (req, res) {
    const img = req.file('thumbnail')
    const path = img.tmpPath()
    yield this.imgService.resize(path)
    const base64 = fs.readFileSync(path, {encoding: 'base64'})
    const dataUrl = `data:${img.mimeType()};base64,${base64}`

    return this.httpService.success(res, {dataUrl: dataUrl})
  }
}
module.exports = ImageController
