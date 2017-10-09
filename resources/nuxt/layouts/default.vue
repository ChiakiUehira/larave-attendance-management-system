<template>
  <div>
    <side-navi/>
    <main id="main">
      <my-header/>
      <nuxt/>
    </main>
    <log-out class="logout" v-if="$store.state.isLogin"/>
  </div>
</template>

<script>
import SideNavi from '~/components/SideNavi.vue'
import LogOut from '~/components/Logout.vue'
import MyHeader from '~/components/MyHeader.vue'
export default {
  middleware: 'auth',
  components: {
    SideNavi,
    LogOut,
    MyHeader,
  }
}
</script>

<style scoped>
  #main {
    margin-left: 220px;
  }
  .logout{
    position: absolute;
    top:20px;
    right:20px;
  }
</style>




