
const fs = require('fs')
const CSVLoaderService = require('../../app/Service/CSVLoaderService')
const service = new CSVLoaderService()

class FactoryService {
  * create (model, filePath) {
    const result = fs.readFileSync(filePath, {encoding: 'utf-8'})
    const contexts = yield service.toObjects(result)
    yield contexts.map((context) => {
      return model.create(context)
    })
  }
}

module.exports = FactoryService
