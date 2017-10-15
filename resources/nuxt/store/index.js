export const state = () => ({
  device: 'pc',
  token: 0,
  isLoading: false,
  isLogin: false,
  isManager: false,
  me: null,
  users: null,
  company: null,
  news: null,
  groups: null
})

export const mutations = {
  SET_DEVICE (state, payload) {
    state.device = payload
  },
  SET_TOKEN (state, payload) {
    state.token = payload
  },
  SET_IS_LOADING (state, payload) {
    state.isLoading = payload
  },
  SET_IS_LOGIN (state, payload) {
    state.isLogin = payload
  },
  SET_IS_MANAGER (state, payload) {
    state.isManager = payload
  },
  SET_ME (state, payload) {
    state.me = payload
  },
  SET_USERS (state, payload) {
    state.users = payload
  },
  SET_GROUPS (state, payload) {
    state.groups = payload
  },
  SET_COMPANY (state, payload) {
    state.company = payload
  },
  SET_NEWS (state, payload) {
    state.news = payload
  }
}
