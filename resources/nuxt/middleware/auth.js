import {getToken} from '../utils/token'

export default function ({store, redirect, req, app}) {
  if (!store.state.isLogin && getToken(req)) {
    store.commit('SET_TOKEN', getToken(req))
    store.commit('SET_IS_LOGIN', true)
    app.$http.get('me').then(({data}) => {
      store.commit('SET_ME', data.me)
      store.commit('SET_IS_MANAGER', data.me.manager_flag === 'manager')
    })
    app.$http.get('company').then(({data}) => {
      store.commit('SET_COMPANY', data.company)
    })
  }
  if (!store.state.isLogin) {
    redirect('/login')
  }
}
