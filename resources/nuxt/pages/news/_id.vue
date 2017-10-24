<template>
<div>
  <contents-name :name="`ニュース一覧 / ${news.title}`" />
    <div class="page">
      <div class="contents markdown-body">
        <div v-html="detail"></div>
      </div>
    </div>
</div>
</template>
<script>
import marked from 'marked'
import mdCss from 'github-markdown-css'
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
    detail (){
      return marked(this.news.detail)
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
    padding: 30px;
  }
  .markdown-body {
    color: #334257;
    box-sizing: border-box;
    min-width: 100%;
    max-width: 100%;
    margin: 0 auto;
  }
</style>
