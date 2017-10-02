const Route = use('Route')

module.exports = Route.group('article', () => {
  Route.get('/article', 'ArticleController.index')
  Route.get('/article/:id', 'ArticleController.show')
  Route.post('/article', 'ArticleController.store')
  Route.put('/article/:id', 'ArticleController.update')
  Route.delete('/article/:id', 'ArticleController.destroy')
}).prefix('api/v1')
