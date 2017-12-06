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
      <div class="log-menu">
        <div class="title"><span>並び替え</span></div>
        <nav>
          <ul>
            <li>新着ニュース</li>
            <li>操作ログ</li>
            <li>その他</li> <!-- 検討 -->
          </ul>
        </nav>
      </div>
    </div>
    <div class="pager">
      <el-pagination
          layout="prev, pager, next"
          :total="10"
          :page-size="1"
          :current-page="p"
          @current-change="handleCurrentChange"
      >
      </el-pagination>
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
    display: inline-block;
    width: 75%;
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

  .log-menu {
    display: inline-block;
    vertical-align: top;
    width: 20%;
    letter-spacing: normal;
    margin-left: 5%;
  }

  .log-menu .title {
    text-align: center;
    font-size: 16px;
    color: #5a5e66;
  }

  .log-menu nav {
    margin-top: 15px;
  }

  .log-menu ul li {
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-left: solid 10px #ccc;
    transition: ease 0.3s;
    color: #5a5e66;
  }

  .log-menu ul li:hover {
    box-shadow: 0 6px 12px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  }

  .pager {
    padding: 10px;
    background: #fff;
    text-align: center;
  }
</style>