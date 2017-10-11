const Route = use('Route')

module.exports = Route.group('manager', () => {
  Route.post('/invite', '/Manager/InviteController.store')
  //Todo manager系のルート作成
}).prefix('api/v1/manager').middleware('auth')
