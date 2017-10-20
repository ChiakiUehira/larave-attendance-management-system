const Route = use('Route')

module.exports = Route.group('upload', () => {
  Route.post('/resize', 'ImageController.resize')
}).prefix('api/v1/image')
