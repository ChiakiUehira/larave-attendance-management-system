<template>
    <div>
        <nuxt-link to="/management/invite">
            <div class="management">
                <el-card>
                    <p>ユーザ招待</p>
                </el-card>
            </div>
        </nuxt-link>
        <div class="management">
            <el-card>
                <p>打刻申請</p>
            </el-card>
        </div>
        <div class="management">
            <el-card>
                <p>グループ作成</p>
            </el-card>
        </div>
        <div class="management">
            <el-card>
                <p>ユーザ情報変更</p>
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
    .management {
        width: 49%;
        display: inline-block;
        margin-bottom: 25px;
        border:1px solid #d1dbe5;
        box-sizing: border-box;
    }
    .management:hover{
        box-shadow: 0 6px 12px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    }

    .management:nth-child(2n) {
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
        color:#8a8a8a;
    }
</style>
