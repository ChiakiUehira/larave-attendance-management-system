<template>
<div>
  <contents-name >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>ニュース一覧</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
  <div class="page">
    <div class="controllers">
      <div class="btns">
        <el-button-group>
          <el-button type="primary" icon="arrow-left">Previous Page</el-button>
          <el-button type="primary">Next Page<i class="el-icon-arrow-right el-icon-right"></i></el-button>
        </el-button-group>
      </div>
    </div>
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
  .controllers {
    margin-bottom: 10px;
    text-align: right;
  }
  .btns {
    background-color: #fff;
    padding: 10px;
  }
</style>
