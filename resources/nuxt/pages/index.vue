<template>
  <div>
    <contents-name>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>ホーム</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
    <div class="page">
      <div class="feeds">
        <header>最新のフィード</header>
        <nuxt-link to="/">
          <div class="feed" v-for="i in 5" :key="i.id">
            <h1 class="title">プロフィールが変更されました</h1>
            <p class="posted">
              2017年12月19日 18時47分
            </p>
          </div>
        </nuxt-link>
      </div>
      <div class="news">
        <header>最新のニュース</header>
        <div class="article" v-for="news in displayNews" :key="news.id">
          <nuxt-link :to="`/news/${news.id}`">
            <h1 class="title">
              {{news.title}}
            </h1>
            <p class="posted">
              {{dateFormat(news.created_at)}}
            </p>
          </nuxt-link>
        </div>
        <footer>
          <nuxt-link to="/news">
            ニュース一覧へ
          </nuxt-link>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  import ContentsName from '@/components/ContentsName.vue'
  import moment from 'moment'
  export default {
    async fetch ({app, store}) {
      if (!store.state.news) {
        const {data} = await app.$http.get('/news')
        store.commit('SET_NEWS', data.news)
      }
    },
    data () {
      return {}
    },
    computed: {
      news(){
        return this.$store.state.news
      },
      displayNews(){
        return JSON.parse(JSON.stringify(this.news)).sort(function(a,b) {
          return (a.created_at > b.created_at) ? -1 : 1
        }).slice(0,5)
      }
    },
    methods: {
      dateFormat(date){
        return moment(date).format('YYYY年MM月DD日 HH時mm分')
      }
    },
    components: {
      ContentsName
    },
  }
</script>

<style scoped>
  .feeds {
    background: #fff;
    margin-bottom: 10px;
    border-radius: 2px;
  }

  .feeds header {
    padding: 15px;
    line-height: 20px;
    border-bottom: solid 2px #f8f8f8;
    color: #5A5E66;
    font-size: 15px;
  }

  .feeds .feed {
    padding: 15px;
    line-height: 20px;
    border-bottom: solid 2px #f8f8f8;
  }

  .feed .title {
    font-size: 16px;
    color: #5A5E66;
  }

  .feeds .feed:hover .title {
    color: #409eff;
  }

  .news {
    background: #fff;
    margin-bottom: 10px;
    border-radius: 2px;
  }

  .news header {
    padding: 15px;
    line-height: 20px;
    border-bottom: solid 2px #f8f8f8;
    color: #5A5E66;
    font-size: 15px;
  }

  .news .article {
    padding: 15px;
    line-height: 20px;
    border-bottom: solid 2px #f8f8f8;
  }

  .news .article:hover .title{
    color: #409eff;
  }

  .article .title {
    font-size: 16px;
    color: #5A5E66;
  }

  .news footer {
    padding: 20px;
    text-align: right;
  }

  .news footer a:hover {
    color: #409eff;
  }

  .posted {
    text-align: right;
    color: #5A5E66;
  }
</style>