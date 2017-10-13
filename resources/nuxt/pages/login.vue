<template>
  <section class="container">
    <h1>ログイン</h1>
    <div class="input">
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <el-input placeholder="email" v-model="context.email"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="input">
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <el-input placeholder="password" v-model="context.password"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="btns">
      <el-button @click="reset">Reset</el-button>
      <el-button type="primary" @click="submit">Submit</el-button>
    </div>

  </section>
</template>

<script>
  import { setToken } from '../../../utils/Token'
  export default {
    layout: 'auth',
    data(){
      return {
        context: {
          email: 'sisukai2017@gmail.com',
          password: 'pw'
        },
        isSend: false
      }
    },
    methods:{
      reset(){
        this.context.email = ''
        this.context.password = ''
      },
      submit(){
        if (!this.isSend) {
          this.isSend = true
          this.$http.post('login',this.context).then(({data})=>{
            this.$store.commit('SET_IS_LOGIN',true)
            this.$store.commit('SET_ME',data.me)
            this.$store.commit('SET_TOKEN', data.token)
            this.$store.commit('SET_IS_MANAGER', data.user.manager_flag === 'manager')
            setToken(data.token)
            this.$http.get('company').then(({data})=>{
              this.$store.commit('SET_COMPANY',data.company)
              this.isSend = false
              this.$notify.success('ログインしました')
              this.$router.push('/')
            })
          }).catch((err)=>{
            if(err.response.data.message === 'notRegistered'){ //仮登録時は登録ホームにリダイレクト
              location.href = `/register?t=${err.response.data.t}&id=${err.response.data.id}`
            }
            this.isSend = false
            this.$notify.error('メールアドレスかパスワードが間違っています');
          })
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    margin: 200px auto;
  }
  h1 {
    text-align: center;
    font-size: 25px;
    color: #324157;
  }
  .input {
    margin: 25px 0;
  }
  .btns {
    text-align: center;
  }
</style>

