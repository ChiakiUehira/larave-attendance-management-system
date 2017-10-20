<template>
    <div>
        <nuxt-link to="/management/news/create">
            <el-button type="primary" icon="edit"></el-button>
        </nuxt-link>
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
        const {data} = await app.$http.get('/news')
        store.commit('SET_NEWS', data.news)
      }
    }
  }
</script>

<style scoped>
    .el-button {
        margin-bottom: 10px;
        margin-left: calc(100% - 46px);
    }
</style>
