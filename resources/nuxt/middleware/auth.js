import { getToken, hasToken } from '../../../utils/Token'

export default async ({isServer, isClient, store, redirect, route, req, app}) => {
  let token
  if(isServer && hasToken(req.headers.cookie)){
      token = getToken(req.headers.cookie)
  }
  if(isClient && hasToken(window.document.cookie)){
      token = getToken(window.document.cookie)
  }

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
  }
  if (!store.state.isLogin) {
    return redirect('/login')
  }

}
