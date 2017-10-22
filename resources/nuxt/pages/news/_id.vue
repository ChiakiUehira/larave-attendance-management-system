<template>
<div>
  <contents-name :name="`ニュース / ${news.title}`" />
    <div class="page">
      <div class="contents">
        {{news.detail}}
      </div>
    </div>
</div>
</template>
<script>
import ContentsName from '@/components/ContentsName.vue'
export default {
  components: {
    ContentsName
  },
  computed: {
    news () {
      const id = this.$route.params.id
      return this.$store.state.news.find(news => news.id === Number(id))
    },
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
    padding: 30px;
  }
</style>
