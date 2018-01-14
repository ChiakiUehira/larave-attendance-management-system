export const state = () => ({
  device: 'pc',
  token: null,
  isLoading: false,
  isLogin: false,
  isManager: false,
  me: null,
  users: null,
  company: null,
  news: null,
  groups: null,
  invitingUsers: null,
  attendances: null,
  allUserAttendances: null,
  logs:null
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
  IS_ACTIVATE_USER(state, payload){
    const index = state.users.findIndex((user) => {
      return user.id == payload.id
    })
    state.users[index].isActive = payload.isActive
  },
  SET_INVITING_USERS (state, payload) {
    state.invitingUsers = payload
  },
  SET_GROUPS (state, payload) {
    state.groups = payload
  },
  UPDATE_GROUPS (state, payload) {
    state.groups.push(payload)
  },
  REMOVE_GROUP (state, payload) {
    state.groups.splice(payload, 1)
  },
  SET_COMPANY (state, payload) {
    state.company = payload
  },
  SET_NEWS (state, payload) {
    state.news = payload
  },
  SET_ATTENDANCES (state, payload) {
    state.attendances = payload
  },
  SET_ALL_USER_ATTENDANCES (state, payload) {
    state.allUserAttendances = payload
  },
  SET_LOGS (state, payload){
    state.logs = payload
  }
}
