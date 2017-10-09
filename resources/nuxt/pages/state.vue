<template>
<div>
  {{me}}
</div>
</template>
<script>
export default {
  computed: {
    me () {
      return this.$store.state.me
    }
  },
  async fetch ({app, store}) {
    if (!store.state.me) {
      const { data } = await app.$http.get('/me')
      store.commit('SET_ME', data.me)
    }
  }
}
</script>

<style scoped>
</style>
