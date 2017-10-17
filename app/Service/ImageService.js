'use strict'

const Jimp = require("jimp");

class ImageService {

  * resize (readPath, savePath) {
    yield Jimp.read(readPath).then((image) => {
      image
        .resize(250, 250)
        .write(savePath)
    })
  }
}
module.exports = ImageService