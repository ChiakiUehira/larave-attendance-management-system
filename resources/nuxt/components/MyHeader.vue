<template>
  <div>
    <header>
      <div class="inner">
        <h1>{{company.company_name}}</h1>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  computed:{
    isLogin(){
      return this.$store.state.isLogin
    },
    company () {
      return this.$store.state.company
    }
  }
}
</script>

<style scoped>
  header {
    background-color: #eeeeee;
    width: 100%;
  }
  header .inner {
    padding: 25px;
  }
</style>

