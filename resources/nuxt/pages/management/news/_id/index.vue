<template>
    <section>
        <contents-name name="ニュース詳細">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/management' }">マネジメント</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/management/news' }">ニュース一覧</el-breadcrumb-item>
                <el-breadcrumb-item >ニュース詳細</el-breadcrumb-item>
            </el-breadcrumb>
        </contents-name>
        <div class="markdown-body content">
            <div class="btns">
                <div class="edit">
                    <nuxt-link :to="`/management/news/${news.id}/edit/`" class="el-icon-edit">
                        <span>編集</span>
                    </nuxt-link>
                </div>
                <div class="delete" @click="deleteNews">
                    <a href="#" class="el-icon-delete">
                        <span>削除</span>
                    </a>
                </div>
            </div>
            <div v-html="detail"></div>
        </div>
    </section>
</template>

<script>
  import mdCss from 'github-markdown-css'
  import marked from 'marked'
  import ContentsName from '../../../../components/ContentsName.vue'
  export default{
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
        const {data} = await app.$http.get('/news')
        store.commit('SET_NEWS', data.news)
      }
    },
    methods: {
      deleteNews(){
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
              message: '削除しました',
            });
            this.fetchNews()
            this.$router.push('/management/news')
          })
        }).catch(() => {
          this.$message({type: 'warning', message: 'キャンセルしました'});
        });
      },
      async fetchNews (){
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
    }
    .btns{
        width:190px;
        margin-left:calc(100% - 190px);
    }
    .edit {
        margin-bottom: 10px;
        background-color: #334257;
        cursor: pointer;
        width: 90px;
        border-radius: 3px;
        font-size: 14px;
        color: #b2bfcd;
        display: inline-block;
    }

    .edit a {
        display: block;
        padding: 15px;
        color: #b2bfcd;
        transition: .3s;
        text-decoration: none;
    }

    .edit a:hover {
        color: #334257;
        background: #b2bfcd;
        border-radius: 3px;
    }

    .edit span {
        padding-left: 10px;
    }

    .delete {
        margin-bottom: 10px;
        background-color: #334257;
        cursor: pointer;
        width: 90px;
        border-radius: 3px;
        font-size: 14px;
        color: #b2bfcd;
        display: inline-block;
        margin-left:10px;
    }
    .delete a{
        display: block;
        width:100%;
        padding: 15px;
        color: #b2bfcd;
        transition: .3s;
        text-decoration: none;
    }
    .delete a:hover {
        color: #334257;
        background: #b2bfcd;
        border-radius: 3px;
    }
    .delete span {
        padding-left: 10px;
    }
    .markdown-body {
        color: #334257;
        box-sizing: border-box;
        min-width: 100%;
        max-width: 100%;
        margin: 0 auto;
    }
</style>