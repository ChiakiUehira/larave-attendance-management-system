<template>
  <div>
    <contents-name>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>ホーム</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
    <div class="page">
      <div class="logs">
        <nuxt-link to="/">
          <div class="log" v-for="i in 4">
            <h1 class="title">新しいニュースが投稿されました</h1>
            <p class="body">美味しいパンが焼けたよ...つづく</p>
          </div>
        </nuxt-link>
        <nuxt-link to="/">
        <div class="log" v-for="i in 4">
          <h1 class="title">管理者シューベルトがあなたの役職を変更しました</h1>
          <p class="body">アルバイト > 正社員</p>
        </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  import ContentsName from '@/components/ContentsName.vue'
  export default {
    data () {
      return {}
    },
    components: {
      ContentsName
    },
  }
</script>

<style scoped>
  .page {
    background: #fff;
    padding: 20px;
    letter-spacing: -.4em;
    margin-bottom: 10px;
  }

  .logs {
    letter-spacing: normal;
  }

  .logs .log {
    padding: 15px;
    line-height: 20px;
    border-bottom: solid 2px #f8f8f8;
  }
  .logs .log:hover{
    background:#f8f8f8;
  }

  .log .title {
    font-size: 18px;
    color: #5a5e66;
  }

  .log .body {
    font-size: 14px;
    color: #8a8a8a;
  }

</style>