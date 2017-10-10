import axios from 'axios'
import Vue from 'vue'

const instance = axios.create({
  baseURL: 'http://0.0.0.0:3333/api/v1'
})

export default ({app, store}) => {
  addHeader(instance, store)
  app.$http = instance
  clientSideHttpPlugin(instance, store)
}

const addHeader = (instance, store) => {
  instance.interceptors.request.use((config) => {
    if (store.state.token) {
      config.headers.Authorization = `Bearer ${store.state.token}`
      return config
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })
}

const clientSideHttpPlugin = (store) => {
  let http = {}
  http.install = (Vue) => {
    Vue.prototype.$http = instance
  }
  Vue.use(http)
}
