<template>
<div>
  <contents-name >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>ニュース一覧</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
  <div class="page">
    <div class="contents">
      <div v-for="item in displayNews" :key="item.id" >
        <nuxt-link :to="`/news/${item.id}`">
          <news-card :news="item"/>
        </nuxt-link>
      </div>
    </div>
    <div class="controllers">
      <div class="btns">
          <el-pagination
            layout="prev, pager, next"
            :total="maxCount"
            :page-size="per"
            :current-page="p"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
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
    },
    p () {
      return this.$route.query.p ? Number(this.$route.query.p) : 1
    },
    per () {
      return 5
    },
    offset () {
      return (this.p - 1) * this.per
    },
    maxCount () {
      return this.$store.state.news.length
    },
    maxPage () {
      return Math.ceil(this.maxCount / this.per)
    },
    displayNews () {
      return this.news.slice(this.offset, this.offset + this.per)
    },
  },
  methods: {
    handleCurrentChange (page) {
      return this.$router.push({
        query: { p: page }
      })
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
    margin-top: 10px;
    text-align: center;
  }
  .btns {
    background-color: #fff;
    padding: 10px;
  }
</style>
