<template>
    <div>
        <contents-name name="マネジメント / ニュース">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/management' }">マネジメント</el-breadcrumb-item>
                <el-breadcrumb-item>ニュース一覧</el-breadcrumb-item>
            </el-breadcrumb>
        </contents-name>
        <div class="page">
            <div class="controllers">
                <div></div>
                <div>
                    <div class="create">
                        <nuxt-link to="/management/news/create">
                            <el-button type="primary">投稿</el-button>
                        </nuxt-link>
                    </div>
                </div>
            </div>
            <div class="contents">
                <div v-for="item in news" :key="item.id">
                    <nuxt-link :to="`/management/news/${item.id}`">
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
        const {data} = await app.$http.get('/news')
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
    .controllers > div:first-child{
        border-radius: 2px;
        background-color: #fff;
        padding: 10px;
        width: 100%;
        display: inline-block;
        width: calc(100% - 100px - 10px);
        margin-right: 10px;
        height: 56px;
        vertical-align: top;
    }
    .controllers > div:last-child{
        border-radius: 2px;
        background-color: #fff;
        padding: 10px;
        display: inline-block;
        width: 100px;
        vertical-align: top;
        text-align: center;
    }
</style>
