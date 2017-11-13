<template>
  <div>
    <contents-name >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/news' }">ニュース一覧</el-breadcrumb-item>
        <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
    <div class="page">
      <div class="contents markdown-body">
        <div class="title">{{title}}</div>
        <div v-html="detail"></div>
        <div class="createdAt">{{createdAt}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import marked from 'marked'
import ContentsName from '@/components/ContentsName.vue'
import moment from 'moment'
export default {
  components: {
    ContentsName
  },
  computed: {
    news () {
      const id = this.$route.params.id
      return this.$store.state.news.find(news => news.id === Number(id))
    },
    detail () {
      return marked(this.news.detail)
    },
    createdAt () {
      return moment(this.news.created_at).format('YYYY年MM月DD日 HH時mm分')
    },
    title () {
      return this.news.title
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
  .title {
    margin-bottom: 20px;
    padding-left: 10px;
    font-size: 25px;
    font-weight: bold;
    position: relative;
  }
  .title::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    width: 5px;
    height: 70%;
    background-color: #58a7ff;
    border-radius: 1px 0 0 0;
    transform: translateY(-50%);
  }
  .createdAt {
    text-align: right;
  }
</style>
