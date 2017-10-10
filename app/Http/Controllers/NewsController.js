
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
    yield this.httpService.success(res, {news})
  }

  * store (req, res) {
    const loginUser = yield req.auth.getUser()
    const company = yield this.companyService.getCompanyFromUser(loginUser)
    const rules = this.newsContext.storeRules()
    const context = this.newsContext.storeContext(req)
    const validation = yield Validator.validateAll(context, rules)
    if (validation.fails()) {
      yield this.httpService.failed(res, {error: validation.messages()})
    }
    const news = yield this.newsService.store(company, context)
    yield this.httpService.success(res, {news})
  }
  * show (req, res) {
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const isContain = yield this.companyService.checkSomeCompany(loginUser, id)
    if (!isContain) {
      yield this.httpService.failed(res, {error: 'Forbidden'}, 403)
    }
    const news = yield this.newsService.getById(id)
    yield this.httpService.success(res, {news})
  }
  * update (req, res) {
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const rules = this.newsContext.storeRules()
    const context = this.newsContext.storeContext(req)
    const validation = yield Validator.validateAll(context, rules)
    const isContain = yield this.companyService.checkSomeCompany(loginUser, id)
    if (!isContain) {
      yield this.httpService.failed(res, {error: 'Forbidden'}, 403)
    }
    if (validation.fails()) {
      yield this.httpService.failed(res, {error: validation.messages()})
    }
    const news = yield this.newsService.update(id, context)
    yield this.httpService.success(res, {news})
  }
  * destroy (req, res) {
    const id = req.param('id')
    const loginUser = yield req.auth.getUser()
    const isContain = yield this.companyService.checkSomeCompany(loginUser, id)
    if (isContain) {
      const news = yield this.newsService.getById(id)
      yield news.delete()
      yield this.httpService.success(res)
    }
    yield this.httpService.failed(res, {error: 'Bad Request'}, 400)
  }
}

module.exports = NewsController
