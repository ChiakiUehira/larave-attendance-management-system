<template>
  <section class="container">
    <div class="content">
      <div class="content__inner">
        <div class="content__name">
          <h1>ログイン</h1>
        </div>
        <div class="content__body">
          <el-form label-width="120px">
            <el-form-item label="メールアドレス">
              <el-input v-model="context.email"></el-input>
            </el-form-item>
            <el-form-item label="パスワード">
              <el-input type="password" v-model="context.password"></el-input>
            </el-form-item>
          </el-form>
          <div class="btns">
            <el-button @click="reset">リセット</el-button>
            <el-button type="primary" @click="submit">ログイン</el-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { setToken } from '../../../../utils/Token'
  export default {
    layout: 'auth',
    data () {
      return {
        context: {
          email: 'sisukai2017@gmail.com',
          password: 'pw'
        },
        isSend: false
      }
    },
    methods: {
      reset () {
        this.context.email = ''
        this.context.password = ''
      },
      async submit () {
        if (!this.isSend) {
          this.isSend = true
          try {
            const res = await this.$http.post('login', this.context)
            setToken(res.data.token)
            location.href = '/'
          } catch (err) {
            if (err.response.data.message === 'notRegistered') {
              location.href = `/register?t=${err.response.data.t}&id=${err.response.data.id}`
            }
            this.$notify.error('メールアドレスかパスワードが間違っています')
            this.isSend = false
          }
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    display: table;
    width: 100vw;
    height: 100vh;
  }
  .content {
    vertical-align: middle;
    display: table-cell;
  }
  .content__inner {
    width: 700px;
    margin: 0 auto;
    border: 1px solid #e6e6e6;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  }
  .content__name {
    background-color: #419dff;
    padding: 50px 40px;
  }
  .content__name h1{
    font-size: 25px;
    color: #fff;
    letter-spacing: 2px;
  }
  .content__body {
    padding: 50px 50px 30px;
  }
  .btns {
    text-align: right;
  }
</style>

