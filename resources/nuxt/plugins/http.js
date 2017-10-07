import axios from 'axios'
import Vue from 'vue'

export default ({ store }) => {
  const instance = axios.create({
    baseURL: 'http://0.0.0.0:3333/api/v1'
  });

  instance.interceptors.request.use((config) => {
    if (store.state.token) {
      config.headers.Authorization = `Bearer ${store.state.token}`
      return config
    }
    return config
  }, function (error) {
    return Promise.reject(error);
  })

  let http = {}
  http.install = (Vue)=> {
    Vue.prototype.$http = ()=>{ return instance}
  }
  Vue.use(http)
}

