
const csv = require('csv')

class CSVLoaderService {
  * toObjects (data) {
    return new Promise((resolve, reject) => {
      csv.parse(data, {columns: true}, (error, output) => {
        if (error) reject(error)
        resolve(output)
      })
    }).then((data) => {
      return data
    })
  }
}

module.exports = CSVLoaderService
