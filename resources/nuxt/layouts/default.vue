<template>
  <div>
    <side-navi/>
    <main id="main">
      <nuxt/>
    </main>
  </div>
</template>

<script>
import SideNavi from '~/components/SideNavi.vue'

export default {
  components: {
    SideNavi
  }
}
</script>

<style scoped>
  #main {
    margin-left: 220px;
    height: 100vh;
  }
</style>




