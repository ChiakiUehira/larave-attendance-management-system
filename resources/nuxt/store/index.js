export const state = () => ({
  token: 0
})

export const mutations = {
  SET_TOKEN (state, payload) {
    state.token = payload
  }
}
