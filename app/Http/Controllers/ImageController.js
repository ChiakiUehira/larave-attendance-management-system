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
    const img = req.file('file')
    const token = uid(16)
    const randPath = `/tmp/${token}.${img.extension()}`

    yield this.imgService.resize(img.tmpPath(), randPath)

    fs.readFile(randPath, (err, data) => {
      if (err) {
        this.httpService.failed(res, {error: err})
      }
      // todo 要修正!再現性はないが、たまにバグる
      const dataUrl = `data:${img.mimeType()};base64,${data.toString('base64')}`
      this.httpService.success(res, {dataUrl: dataUrl})
    })
  }
}
module.exports = ImageController
