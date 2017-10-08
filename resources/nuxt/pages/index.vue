<template>
  <section class="container">

  </section>
</template>

<script>
  export default {
    fetch({app,store}){
      return app.$http.post('/login',{email:'sisukai2017@gmail.com', password:'pw'}).then((obj) =>{
        store.commit('SET_TOKEN', obj.data.token)
        app.$http.get('/news')
      })
    },
    created(){
      this.$http.post('/login',{email:'sisukai2017@gmail.com', password:'pw'}).then((obj) =>{
        this.$store.commit('SET_TOKEN', obj.data.token)
        this.$http.get('/news')
      })
    }
  }
</script>
