const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml');
const JsonRefs = require('json-refs')

class SwaggerController {
  * index (req, res) {
    return yield res.sendView('swagger.index')
  }

  * show (req, res) {
    //　showの修正完了したら消す
    const filePath = path.resolve(__dirname, '../../../document/result/app.json')
    const doc = fs.readFileSync(filePath, 'utf8')
    res.json(doc)
  }

  // * show (req, res) {
  //   //todo 相対参照できるようにする
  //   try {
  //     const filePath = path.resolve(__dirname, '../../../document/app.yml')
  //     const doc = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'))
  //     const option = {
  //       filter: ['relative', 'remote']
  //     }
  //     return yield JsonRefs.resolveRefs(doc, option).then(function (result) {
  //       return res.json(result.resolved)
  //     })
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
}

module.exports = SwaggerController

