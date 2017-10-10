<template>
  <section>
    <div class="logout" @click="logout">
      <span>Logout</span>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'logout',
    methods: {
      logout(){
        this.$store.commit('SET_IS_LOGIN', false)
        this.$store.commit('SET_TOKEN', false)
        document.cookie = '__t='
        location.href = '/login'
      }
    }
  }
</script>

<style scoped>
  .logout {
    padding: 25px;
    background-color: #334257;
    color: #b2bfcd;
    cursor: pointer;
    transition: .3s;
  }
  .logout:hover {
    background-color: #48576a;
  }
</style>
