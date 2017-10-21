<template>
    <section name="news" class="news">
        <el-input placeholder="タイトル" v-model="news.title"></el-input>
        <h3>※投稿はマークダウン形式になります</h3>
        <div class="before">
            <el-input
                    type="textarea"
                    :autosize="{ minRows: 20}"
                    placeholder="Please input"
                    v-model="news.detail">
            </el-input>
        </div>

        <div class="after markdown-body" v-html="after">

        </div>
        <el-button @click="edit" v-if="isEdit">編集</el-button>
        <el-button @click="post" v-else>投稿</el-button>
    </section>
</template>

<script>
  import marked from 'marked'
  import mdCss from 'github-markdown-css'
  export default{
    props: ["type", "news"],
    computed: {
      after(){
        return marked(this.news.detail)
      },
      isEdit(){
        return this.type === 'edit'
      }
    },
    methods: {
      async post(){
        const {data} = await this.$http.post('news', this.news)
        if (data.success) {
          this.fetchNews()
          this.$notify.success('投稿が完了しました')
          this.$router.push(`/management/news/${data.news.id}`)
        } else {
          this.$notify.error('投稿に失敗しました、もう一度やり直してください')
        }
      },
      async edit(){
        const {data} = await this.$http.put(`/news/${this.news.id}`, this.news)
        if(data.success){
          this.fetchNews()
          this.$notify.success('更新が完了しました')
          this.$router.push(`/management/news/${data.news.id}`)
        }else{
          this.$notify.error('更新に失敗しました')
        }
      },
      async fetchNews (){
        const {data} = await this.$http.get('/news')
        this.$store.commit('SET_NEWS', data.news)
      }
    }
  }
</script>

<style scoped>
    .el-button {
        margin-top: 10px;
    }

    .el-input {
        margin-bottom: 20px;
    }

    h3 {
        color: rgb(131, 145, 165);
        margin-bottom: 10px;
    }

    .news {
        max-width: 90%;
        margin: 0 auto;
        position: relative;
    }

    .before {
        display: inline-block;
        width: 49.5%;
        letter-spacing: 2px;
    }

    .before-edit {
        resize: none;
        width: 100%;
        border-color: rgb(191, 203, 217);
        border-radius: 3px;
        outline: none;
        transition: ease .3s;
        box-sizing: border-box;
        font-size: 15px;
        color: #334257;
        padding: 15px;
    }

    .before-edit:hover {
        border-color: rgb(131, 145, 165);
    }

    .after {
        display: inline-block;
        width: 49.5%;
        margin-left: 1%;
        vertical-align: top;
        letter-spacing: 2px;
        color: #334257;
    }

    .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        font-size: 13px;
        padding: 0 20px;
    }

    @media (max-width: 767px) {
        .markdown-body {
            padding: 15px;
        }
    }
</style>