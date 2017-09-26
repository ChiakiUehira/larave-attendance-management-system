import axios from 'axios'
import Vue from 'vue'

let http = http || {}

http.factory = (options=null) => {
  return axios.create({
    baseURL: 'http://0.0.0.0:3333/api/v1/',
    ...options
  })
}

http.install = (Vue, options) => {
  Vue.prototype.$http = http.factory({
    // headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
  })
}

Vue.use(http)

export default ({ app }) => {
  app.$http = http.factory()
}
