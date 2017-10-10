<template>
  <div>
    <side-navi/>
    <main id="main">
      <my-header class="my-header" />
      <div class="container">
        <nuxt/>
      </div>
    </main>
  </div>
</template>

<script>
import SideNavi from '~/components/SideNavi.vue'
import MyHeader from '~/components/MyHeader.vue'
export default {
  middleware: 'auth',
  components: {
    SideNavi,
    MyHeader,
  }
}
</script>

<style scoped>
  #main {
    margin-left: 220px;
  }
  #main .container {
    padding: 100px 20px 80px;
  }
  .logout{
    position: absolute;
    top:20px;
    right:20px;
  }
  .my-header {
    position: fixed;
    top: 0;
    right: 0;
    width: calc(100% - 220px);
  }
</style>
