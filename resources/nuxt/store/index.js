
import { getToken, hasToken } from '../../../utils/Token'
import axios from 'axios'

export const actions = {
  async nuxtServerInit ({ app, commit }, { req }) {
    let token
    if (hasToken(req.headers.cookie)) {
      token = getToken(req.headers.cookie)
    }
    if (token) {
      const http = axios.create({
        baseURL: `${process.env.API_URL}/api/v1/`
      })
      http.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`
        return config
      }, function (error) {
        return Promise.reject(error)
      })

      commit('SET_IS_LOGIN', true)
      commit('SET_TOKEN', token)

      const _user = await http.get('user')
      commit('SET_USERS', _user.data.users)

      const _me = await http.get('me')
      commit('SET_ME', _me.data.me)
      commit('SET_IS_MANAGER', _me.data.me.manager_flag === 'manager')

      const _company = await http.get('company')
      commit('SET_COMPANY', _company.data.company)

      const _users = await http.get('user')
      commit('SET_USERS', _users.data.users)
    }
  }
}

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
  logs: null
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
  SET_USER_TYPE (state, payload) {
    const index = state.users.findIndex((user) => {
      return user.id == payload.id
    })
    state.users[index].type = payload.type
  },
  SET_USER_STATE (state, payload) {
    const index = state.users.findIndex((user) => {
      return user.id == payload.id
    })
    state.users[index].state = payload.state
  },
  IS_ACTIVATE_USER (state, payload) {
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
  SET_LOGS (state, payload) {
    state.logs = payload
  }
}
