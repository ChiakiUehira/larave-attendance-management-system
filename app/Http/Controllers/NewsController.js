
const NewsService = require('../../Service/NewsService')
const CompanyService = require('../../Service/CompanyService')
const NewsContext = require('../Contexts/NewsContext')
const Validator = use('Validator')

class NewsController {
  constructor () {
    this.newsService = new NewsService()
    this.companyService = new CompanyService()
    this.newsContext = new NewsContext()
  }
  * index (req, res) {
    const loginUser = yield req.auth.getUser()
    const news = yield this.newsService.fetchNewsFromUser(loginUser)
    res.json({
      success: true,
      news
    })
  }

  * store (req, res) {
    const loginUser = yield req.auth.getUser()
    const company = yield this.companyService.getCompanyFromUser(loginUser)
    const rules = this.newsContext.storeRules()
    const context = this.newsContext.storeContext(req)
    const validation = yield Validator.validateAll(context, rules)
    if (!validation.fails()) {
      console.log(context);
      const news = yield this.newsService.store(company, context)
      res.json({
        success: true,
        news
      })
    } else {
      res.json({
        success: false,
        error: validation.messages()
      })
    }
  }
  * show (req, res) {
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const isContain = yield this.companyService.checkSomeCompany(loginUser, id)
    if (!isContain) {
      res.json({
        success: false,
        news: null
      })
      return
    }
    const news = yield this.newsService.getById(id)
    if (news) {
      res.json({
        success: true,
        news
      })
    } else {
      res.json({
        success: false,
        news
      })
    }
  }
  * update (req, res) {
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const rules = this.newsContext.storeRules()
    const context = this.newsContext.storeContext(req)
    const validation = yield Validator.validateAll(context, rules)
    const isContain = yield this.companyService.checkSomeCompany(loginUser, id)
    if (!isContain) {
      res.json({
        success: false
      })
      return
    }
    if (validation.fails()) {
      res.json({
        success: false,
        error: validation.messages()
      })
      return
    }
    const news = yield this.newsService.update(id, context)
    res.json({
      success: true,
      news
    })
  }
  * destroy (req, res) {
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const isContain = yield this.companyService.checkSomeCompany(loginUser, id)
    if (isContain) {
      const news = yield this.newsService.getById(id)
      yield news.delete()
      res.json({success: true})
    } else {
      res.json({success: false})
    }
  }
}

module.exports = NewsController
