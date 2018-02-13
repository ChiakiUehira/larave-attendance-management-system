import { getToken, hasToken } from '../../../utils/Token'

export default async ({isServer, isClient, store, redirect, route, req, app}) => {
  let token
  if (isServer && hasToken(req.headers.cookie)) {
    token = getToken(req.headers.cookie)
  }
  if (isClient && hasToken(window.document.cookie)) {
    token = getToken(window.document.cookie)
  }
  if (!store.state.isLogin && token) {
    if (route.name === 'login') {
      return redirect('/')
    }
  }
  if (!store.state.isLogin) {
    return redirect('/login')
  }
}
