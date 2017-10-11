
const HttpService = require('../../Service/HttpService')
const NewsService = require('../../Service/NewsService')
const CompanyService = require('../../Service/CompanyService')
const NewsContext = require('../Contexts/NewsContext')
const Validator = use('Validator')

class NewsController {
  constructor () {
    this.httpService = new HttpService()
    this.newsService = new NewsService()
    this.companyService = new CompanyService()
    this.newsContext = new NewsContext()
  }

  * index (req, res) {
    const loginUser = yield req.auth.getUser()
    const news = yield this.newsService.fetchNewsFromUser(loginUser)
    return this.httpService.success(res, {news})
  }

  * store (req, res) {
    const loginUser = yield req.auth.getUser()
    const company = yield this.companyService.getCompanyFromUser(loginUser)
    const rules = this.newsContext.storeRules()
    const context = this.newsContext.storeContext(req)
    const validation = yield Validator.validateAll(context, rules)
    if (validation.fails()) {
      return this.httpService.failed(res, {error: validation.messages()})
    }
    const news = yield this.newsService.store(company, context)
    return this.httpService.success(res, {news})
  }

  * show (req, res) {
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const company = yield this.companyService.getCompanyFromUser(loginUser)
    const isContain = yield this.newsService.contains(company, id)
    if (!isContain) {
      return this.httpService.failed(res, {error: 'Forbidden'}, 403)
    }
    const news = yield this.newsService.getById(id)
    return this.httpService.success(res, {news})
  }

  * update (req, res) {
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const company = yield this.companyService.getCompanyFromUser(loginUser)
    const isContain = yield this.newsService.contains(company, id)
    if (!isContain) {
      return this.httpService.failed(res, {error: 'Forbidden'}, 403)
    }
    const rules = this.newsContext.storeRules()
    const context = this.newsContext.storeContext(req)
    const validation = yield Validator.validateAll(context, rules)
    if (validation.fails()) {
      return this.httpService.failed(res, {error: validation.messages()}, 400)
    }
    const news = yield this.newsService.update(id, context)
    return this.httpService.success(res, {news})
  }

  * destroy (req, res) {
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const company = yield this.companyService.getCompanyFromUser(loginUser)
    const isContain = yield this.newsService.contains(company, id)
    if (!isContain) {
      return this.httpService.failed(res, {error: 'Forbidden'}, 403)
    }
    const news = yield this.newsService.getById(id)
    yield news.delete()
    return this.httpService.success(res)
  }
}

module.exports = NewsController
