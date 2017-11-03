'use strict'

const Jimp = require('jimp')

class ImageService {
  * resize (path) {
    return yield Jimp.read(path).then((image) => {
      image
        .resize(250, 250)
        .write(path)
    })
  }
}
module.exports = ImageService
