<template>
  <div>
    <side-navi/>
    <main id="main">
      <nuxt/>
    </main>
    <log-out class="logout" v-if="$store.state.isLogin"/>
  </div>
</template>

<script>
import SideNavi from '~/components/SideNavi.vue'
import LogOut from '~/components/Logout.vue'
export default {
  middleware: 'auth',
  components: {
    SideNavi,
    LogOut
  }
}
</script>

<style scoped>
  #main {
    margin-left: 220px;
    height: 100vh;
  }
  .logout{
    position: absolute;
    top:20px;
    right:20px;
  }
</style>




