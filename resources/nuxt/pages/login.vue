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
  export default {
    data(){
      return {
        context: {
          email: '',
          password: ''
        }
      }
    },
    methods:{
      reset(){
        this.context.email = ''
        this.context.password = ''
      },
      submit(){
        this.$http.post('auth',this.context).then(({data})=>{
          localStorage.setItem('token', data.token)
          this.$store.commit('login')
          this.$message.success('ログインしました');
          this.$router.push('/')
        }).catch((err)=>{
          this.$message.error('メールアドレスかパスワードが間違っています');
        })
      }
    },
    fetch({ store, redirect }){
      if (store.state.auth) {
        redirect('/')
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

