<template>
<div>
  <contents-name name="ニュース" />
    <div class="page">
      <div class="contents">
        <div v-for="item in news" :key="item.id" >
          <nuxt-link :to="`/news/${item.id}`">
            <news-card :news="item"/>
          </nuxt-link>
        </div>
      </div>
    </div>
</div>
</template>
<script>
import NewsCard from '~/components/NewsCard'
import ContentsName from '@/components/ContentsName.vue'
export default {
  components: {
    NewsCard,
    ContentsName
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
  .contents {
    border-radius: 2px;
    background-color: #fff;
    padding: 30px 30px 1px;
  }
</style>
