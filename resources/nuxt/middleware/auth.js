import { getToken, hasToken } from '../../../utils/Token'

export default async function ({isServer, store, redirect, route, req, app}) {

  if (isServer && !req) return

  const token = isServer ? getToken(req.headers.cookie) : getToken(window.document.cookie)

  if (!store.state.isLogin && token) {
    if (route.name === 'login') {
      return redirect('/')
    }

    store.commit('SET_IS_LOGIN', true)
    store.commit('SET_TOKEN', token)

    const _me = await app.$http.get('me')
    store.commit('SET_ME', _me.data.me)
    store.commit('SET_IS_MANAGER', _me.data.me.manager_flag === 'manager')

    const _company = await app.$http.get('company')
    store.commit('SET_COMPANY', _company.data.company)

    return
  }

  if (!store.state.isLogin) {
    return redirect('/login')
  }

}
