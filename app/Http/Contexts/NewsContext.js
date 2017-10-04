
class NewsContext {
  storeRules () {
    return {
      title: 'required',
      detail: 'required'
    }
  }
  storeContext (req) {
    return {
      title: req.input('title'),
      detail: req.input('detail')
    }
  }
}

module.exports = NewsContext
