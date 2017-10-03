const Route = use('Route')

module.exports = Route.group('company', () => {
  Route.get('/company', 'CompanyController.show')
  Route.post('/company', 'CompanyController.store')
  Route.put('/company', 'CompanyController.update')
  Route.delete('/company', 'CompanyController.destroy')
}).prefix('api/v1')
