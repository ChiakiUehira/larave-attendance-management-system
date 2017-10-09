export default function ({store, redirect, req, app}) {
  if (!store.state.isLogin && getToken(req)) {
    store.commit('SET_TOKEN', getToken(req))
    store.commit('SET_IS_LOGIN',true)
    app.$http.get('me').then(({data}) => {
      store.commit('SET_IS_MANAGER',data.loginUser.manager_flag === 'manager')
    })
  }
  if (!store.state.isLogin){
    redirect('/login')
  }
}

export const getToken = (req) => {
  if (!req.headers.cookie) return false
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('__t='))
  if (!jwtCookie) return false
  const token = jwtCookie.split('=')[1]
  return token
}
