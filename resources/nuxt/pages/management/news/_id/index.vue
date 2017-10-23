<template>
    <section>
        <contents-name :name="`ニュース一覧 / ${news.title}`" />
        <div class="nav">
            <nuxt-link :to="`/management/news/edit/${news.id}`" class="edit">
                <el-button icon="edit"></el-button>
            </nuxt-link>
            <el-button icon="delete" @click="deleteNews"></el-button>
        </div>
        <div class="markdown-body content">
            <div v-html="detail"></div>
        </div>
    </section>
</template>

<script>
  import mdCss from 'github-markdown-css'
  import marked from 'marked'
  import ContentsName from '../../../../components/ContentsName.vue'
  export default{
    components:{
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
    .content{
        padding:40px;
        background-color: #fff;
        box-sizing: border-box;
    }
    .nav{
        margin-left: calc(100% - 120px);
        margin-bottom:10px;
        min-width: 120px;
        max-width: 120px;
        text-align: center;
    }
    .edit{
        margin-right:15px;
    }

    .markdown-body {
        color: #334257;
        box-sizing: border-box;
        min-width: 100%;
        max-width: 100%;
        margin: 0 auto;
    }
</style>