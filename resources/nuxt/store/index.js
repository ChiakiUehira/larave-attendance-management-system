import Vuex from 'vuex'

const store = () => new Vuex.Store({
  state: {
    articles: null,
    isLogin: false,
    token: null
  },
  mutations: {
    setArticles (state, articles) {
      state.articles = articles
    },
    login (state) {
      state.isLogin = true
    },
    logout (state) {
      state.isLogin = false
    },
  }
})

export default store
