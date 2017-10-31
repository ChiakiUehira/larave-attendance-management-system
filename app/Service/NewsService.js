
const NewsModel = use('App/Model/News')

class NewsService {
  * fetchNewsFromUser (user) {
    const company = yield user.company().first()
    const news = yield company.news().orderBy('created_at', 'desc').fetch()
    return news
  }

  * getById (id) {
    const news = yield NewsModel.find(id)
    return news
  }

  * contains (company, id) {
    const news = yield company.news().fetch()
    return news.some((news) => {
      return news.id === Number(id)
    })
  }

  * store (company, context) {
    const news = new NewsModel(context)
    yield company.news().save(news)
    return news
  }

  * update (id, context) {
    const news = yield this.getById(id)
    if (news) {
      news.fill(context)
      yield news.save()
      return news
    } else {
      return {}
    }
  }
}

module.exports = NewsService
