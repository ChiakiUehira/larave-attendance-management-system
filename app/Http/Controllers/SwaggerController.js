const fs = require('fs')
const path = require('path')
yaml = require('js-yaml');

class SwaggerController {
  * index (req, res) {
    return yield res.sendView('swagger.index')
  }
  * show (req, res) {
    try {
      const filePath = path.resolve(__dirname,'../../../document/app.yaml')
      const doc = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'))
      return res.json(doc)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = SwaggerController

