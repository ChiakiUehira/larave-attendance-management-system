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
  import {setToken} from '../utils/token'
  export default {
    layout: 'auth',
    data(){
      return {
        context: {
          email: 'sisukai2017@gmail.com',
          password: 'pw'
        }
      }
    },
    methods:{
      reset(){
        this.context.email = ''
        this.context.password = ''
      },
      submit(){
        this.$http.post('login',this.context).then(({data})=>{
          this.$store.commit('SET_IS_LOGIN',true)
          this.$store.commit('SET_ME',data.me)
          this.$store.commit('SET_TOKEN', data.token)
          this.$store.commit('SET_IS_MANAGER', data.user.manager_flag === 'manager')
          setToken(data.token)
          this.$notify.success('ログインしました')
          this.$router.push('/')
          // @TODO company set
        }).catch((err)=>{
          this.$notify.error('メールアドレスかパスワードが間違っています');
        })
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

