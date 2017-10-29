<template>
    <div>
        <contents-name name="マネジメント / ニュース">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/management' }">マネジメント</el-breadcrumb-item>
                <el-breadcrumb-item>ニュース一覧</el-breadcrumb-item>
            </el-breadcrumb>
        </contents-name>
        <div class="page">
            <div class="btn">
                <div class="post">
                    <nuxt-link to="/management/news/create" class="el-icon-plus">
                        <span>投稿</span>
                    </nuxt-link>
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
    .btn{
        background: #fff;
    }
    .post {
        margin-left: calc(100% - 90px);
        display: block;
        margin-bottom: 10px;
        background-color: #334257;
        cursor: pointer;
        width: 90px;
        font-size: 14px;
        color: #b2bfcd;
    }

    .post a {
        display: block;
        padding: 15px;
        color: #b2bfcd;
        transition: .3s;
    }

    .post a:hover {
        background: #48576a;
    }

    .post span {
        padding-left: 10px;
        letter-spacing: 2px;
    }

    .contents {
        border-radius: 2px;
        background-color: #fff;
        padding: 30px 30px 1px;
    }
</style>
