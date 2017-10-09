export const state = () => ({
  token: 0,
  isLogin: false,
  isManager: false,
  users: []
})

export const mutations = {
  SET_TOKEN (state, payload) {
    state.token = payload
  },
  SET_IS_LOGIN (state, payload) {
    state.isLogin = payload
  },
  SET_IS_MANAGER (state, payload) {
    state.isManager = payload
  },
  SET_USERS (state, payload) {
    state.users = payload
  }
}
