const ArticleModel = use('App/Model/Article')
const Validator = use('Validator')

class ArticleController {
  * index (req, res) {
    const articles = yield ArticleModel.all()
    res.json({articles})
  }

  * show (req, res) {
    const id = req.param('id')
    const article = yield ArticleModel.find(id)
    res.json({article})
  }

  * store (req, res) {
    const data = req.all()
    const v = yield Validator.validate(data, {
      content: 'required'
    })

    if (v.fails()) {
      res.json(v.messages())
      return false
    }

    try {
      const article = yield ArticleModel.create({
        title: data.title,
        content: data.content
      })
      res.json({article})
    } catch (error) {
      throw error
    }
  }

  * update (req, res) {
    const id = req.param('id')
    const data = req.all()
    const v = yield Validator.validate(data, {
      content: 'required'
    })

    if (v.fails()) {
      res.json(v.messages())
      return false
    }

    try {
      const article = yield ArticleModel.find(id)
      article.fill({title: data.title, content: data.content})
      yield article.save()
      res.json({article})
    } catch (error) {
      throw error
    }
  }

  * destroy (req, res) {
    const id = req.param('id')
    try {
      const article = yield ArticleModel.find(id)
      yield article.delete()

      res.json({article})
    } catch (error) {
      throw error
    }
  }
}

module.exports = ArticleController
