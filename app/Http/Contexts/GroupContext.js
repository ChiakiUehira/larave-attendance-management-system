
class GroupContext {
  storeRules () {
    return {
      name: 'required'
    }
  }
  storeContext (req) {
    return {
      name: req.input('name'),
      detail: req.input('detail')
    }
  }
}

module.exports = GroupContext
