<template>
<div>
  {{news}}
</div>
</template>
<script>
export default {
  computed: {
    news () {
      return this.$store.state.news
    }
  },
  async fetch ({app, store}) {
    if (!store.state.news) {
      const { data } = await app.$http.get('/news')
      store.commit('SET_NEWS', data.news)
    }
  }
}
</script>

<style scoped>
</style>
