const Route = use('Route')

Route.group('api', () => {
  Route.get('/article', 'ArticleController.index')
  Route.get('/article/:id', 'ArticleController.show')
  Route.post('/article', 'ArticleController.store')
  Route.put('/article/:id', 'ArticleController.update')
  Route.delete('/article/:id', 'ArticleController.destroy')
}).prefix('api/v1')
