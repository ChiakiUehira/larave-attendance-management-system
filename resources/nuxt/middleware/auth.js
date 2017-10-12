import { getToken, hasToken } from '../../../utils/Token'

export default async function ({store, redirect, req, app}) {
  if (!store.state.isLogin && hasToken(req)) {
    store.commit('SET_IS_LOGIN', true)
    store.commit('SET_TOKEN', getToken(req))

    const _me = await app.$http.get('me')
    store.commit('SET_ME', _me.data.me)
    store.commit('SET_IS_MANAGER', _me.data.me.manager_flag === 'manager')

    const _company = await app.$http.get('company')
    store.commit('SET_COMPANY', _company.data.company)
  }
  if (!store.state.isLogin) {
    redirect('/login')
  }
}
