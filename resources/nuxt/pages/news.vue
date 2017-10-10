<template>
<div>
  <news-card v-for="item in news" :key="item.id" :news="item"/>
</div>
</template>
<script>
import NewsCard from '~/components/NewsCard'
export default {
  components: {
    NewsCard
  },
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
