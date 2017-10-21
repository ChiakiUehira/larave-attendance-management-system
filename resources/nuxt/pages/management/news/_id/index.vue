<template>
    <section>
        <div class="nav">
            <nuxt-link :to="`/management/news/edit/${news.id}`" class="edit">
                <el-button icon="edit"></el-button>
            </nuxt-link>
            <el-button icon="delete" @click="deleteNews"></el-button>
        </div>
        <div class="markdown-body">
            <h1>{{news.title}}</h1>
            <div v-html="detail"></div>
        </div>
    </section>
</template>

<script>
  import mdCss from 'github-markdown-css'
  import marked from 'marked'
  export default{
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
    methods:{
      deleteNews(){
        this.open()
      },
      open () {
        this.$confirm('削除するとこのニュースは見れなくなります','ニュースを削除しますか？', {
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
          this.$message({type: 'warning',message: 'キャンセルしました'});
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
    .nav{
        margin-left:83%;
        padding-bottom:10px;
    }
    .edit{
        margin-right:15px;
    }

    .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
    }

    @media (max-width: 767px) {
        .markdown-body {
            padding: 15px;
        }
    }
</style>