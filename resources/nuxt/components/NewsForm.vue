<template>
  <section name="news" class="news">
    <div class="page">
      <el-input placeholder="タイトル" v-model="news.title"></el-input>
      <div class="before">
        <el-input type="textarea" :autosize="{ minRows: 20}" placeholder="Please input" v-model="news.detail">
        </el-input>
      </div>
      <div class="after markdown-body" v-html="after"></div>
    </div>
    <div class="controller">
      <el-button @click="edit" v-if="isEdit">更新</el-button>
      <el-button type="primary" @click="post" v-else>投稿</el-button>
    </div>
  </section>
</template>

<script>
  import marked from 'marked'
  import mdCss from 'github-markdown-css'
  export default {
    props: ['type', 'news'],
    computed: {
      after() {
        return this.news.detail.length ? marked(this.news.detail) :
          '<h1>No Text</h1>　<strong>マークダウン形式の投稿が可能です</strong>'
      },
      isEdit() {
        return this.type === 'edit'
      }
    },
    methods: {
      async post() {
        const { data } = await this.$http.post('news', this.news)
        if (data.success) {
          await this.fetchNews()
          this.$notify.success('投稿が完了しました')
          this.$router.push(`/management/news/${data.news.id}`)
        } else {
          this.$notify.error('投稿に失敗しました、もう一度やり直してください')
        }
      },
      async edit() {
        const { data } = await this.$http.put(`/news/${this.news.id}`, this.news)
        if (data.success) {
          this.fetchNews()
          this.$notify.success('更新が完了しました')
          this.$router.push(`/management/news/${data.news.id}`)
        } else {
          this.$notify.error('更新に失敗しました')
        }
      },
      async fetchNews() {
        const { data } = await this.$http.get('/news')
        this.$store.commit('SET_NEWS', data.news)
      }
    }
  }

</script>

<style scoped>

  .page {
    max-width: 100%;
    margin: 0 auto;
    position: relative;
    background: #fff;
    padding: 30px 30px;
    box-sizing: border-box;
  }

  .controller {
    margin-top: 10px;
    background-color: #fff;
    padding: 10px;
    text-align: right;
  }

  .el-input {
    margin-bottom: 20px;
  }

  .before {
    display: inline-block;
    width: 49%;
    letter-spacing: 2px;
  }

  .after {
    display: inline-block;
    width: 49%;
    vertical-align: top;
    letter-spacing: 2px;
    color: #334257;
  }

  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    margin-left: 2%;
    font-size: 13px;
    padding: 0 20px;
  }

  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }

</style>
