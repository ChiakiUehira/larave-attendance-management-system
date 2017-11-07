<template>
    <section>
        <contents-name name="ニュース詳細">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/management' }">マネジメント</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/management/news' }">ニュース一覧</el-breadcrumb-item>
                <el-breadcrumb-item>ニュース詳細</el-breadcrumb-item>
            </el-breadcrumb>
        </contents-name>
        <div class="markdown-body content">
          <div class="title">{{title}}</div>
          <div v-html="detail"></div>
          <div class="createdAt">{{createdAt}}</div>
        </div>
        <div class="controllers">
          <div class="btns">
            <nuxt-link :to="`/management/news/${news.id}/edit/`" class="edit">
                <el-button type="primary" class="el-icon-edit"></el-button>
            </nuxt-link>
            <a href="#" class="delete">
                <el-button type="danger" class="el-icon-delete" @click="deleteNews"></el-button>
            </a>
          </div>
        </div>
    </section>
</template>

<script>
  import mdCss from 'github-markdown-css'
  import marked from 'marked'
  import ContentsName from '../../../../components/ContentsName.vue'
  import moment from 'moment'
  export default{
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
        const {data} = await app.$http.get('/news')
        store.commit('SET_NEWS', data.news)
      }
    },
    methods: {
      deleteNews () {
        this.open()
      },
      open () {
        this.$confirm('削除するとこのニュースは見れなくなります', 'ニュースを削除しますか？', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$http.delete(`/news/${this.news.id}`).then(({data}) => {
            this.$message({
              type: 'success',
              message: '削除しました'
            })
            this.fetchNews()
            this.$router.push('/management/news')
          })
        }).catch(() => {
          this.$message({type: 'warning', message: 'キャンセルしました'})
        })
      },
      async fetchNews () {
        const {data} = await this.$http.get('/news')
        this.$store.commit('SET_NEWS', data.news)
      }
    }
  }
</script>
<style scoped>
    .content {
        padding: 40px;
        background-color: #fff;
        box-sizing: border-box;
        margin-bottom: 10px;
    }

    .controllers {
        text-align: right;
        margin-top: 10px;
    }

    .btns {
      display: inline-block;
      border-radius: 2px;
      background-color: #fff;
      padding: 10px;
      vertical-align: top;
    }

    .btns a {
        display: inline-block;
        text-decoration: none;
        color: #fff;
    }
    .delete{
        margin-left:10px;
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