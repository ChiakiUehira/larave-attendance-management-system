<template>
    <section name="logout">
        <el-button @click="logout">logout</el-button>
    </section>
</template>

<script>
  export default{
    methods:{
      logout(){
        this.$store.commit('SET_IS_LOGIN', false)
        this.$store.commit('SET_TOKEN', false)
        document.cookie = '__t='
        location.href = '/login'
      }
    }
  }
</script>