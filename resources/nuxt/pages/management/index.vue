<template>
    <div class="management">
        <div class="management-item">
            <nuxt-link to="/management/invite">
                <el-card>
                    <p>ユーザ招待</p>
                </el-card>
            </nuxt-link>
        </div>
        <div class="management-item">
            <nuxt-link to="/management/news">
                <el-card>
                    <p>ニュース投稿</p>
                </el-card>
            </nuxt-link>
        </div>
        <div class="management-item">
            <el-card>
                <p>打刻申請</p>
            </el-card>
        </div>
        <div class="management-item">
            <el-card>
                <p>企業情報変更</p>
            </el-card>
        </div>
        <div class="management-item">
            <el-card>
                <p>ユーザ情報変更</p>
            </el-card>
        </div>
        <div class="management-item">
            <el-card>
                <p>退会</p>
            </el-card>
        </div>

    </div>
</template>
<script>
  export default {
    computed: {
      me () {
        return this.$store.state.me
      }
    },
    async fetch ({app, store}) {
      if (!store.state.me) {
        const {data} = await app.$http.get('/me')
        store.commit('SET_ME', data.me)
      }
    }
  }
</script>

<style scoped>
    .management-item {
        width: 49%;
        display: inline-block;
        margin-bottom: 25px;
        box-sizing: border-box;
        -webkit-transition: ease .3s;
        -moz-transition: ease .3s;
        transition: ease .3s;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
        border-radius: 4px;
    }

    .management-item:hover {
        box-shadow: 0 6px 12px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    }

    .management-item:nth-child(2n) {
        margin-left: 2%;
    }

    .el-card {
        width: 100%;
        padding: 60px 0px;
    }

    .el-card p {
        text-align: center;
        font-size: 20px;
        letter-spacing: 2px;
        color: #8a8a8a;
    }
</style>
