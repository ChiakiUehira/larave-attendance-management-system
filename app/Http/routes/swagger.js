const Route = use('Route')

module.exports = Route.group('swagger', () => {
  Route.get('/swagger/config', 'SwaggerController.show')
  Route.get('/swagger','SwaggerController.index')
})
