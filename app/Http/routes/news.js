const Route = use('Route')

module.exports = Route.group('news', () => {
  Route.get('/news', 'NewsController.index')
  Route.post('/news', 'NewsController.store')
  Route.get('/news/:id', 'NewsController.show')
  Route.put('/news/:id', 'NewsController.update')
  Route.delete('/news/:id', 'NewsController.destroy')
}).prefix('api/v1')
