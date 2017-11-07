<template>
  <div>
    <side-navi/>
    <main id="main">
      <my-header class="my-header" />
      <loading/>
      <div class="container">
        <nuxt/>
      </div>
    </main>
  </div>
</template>

<script>
import SideNavi from '~/components/SideNavi.vue'
import MyHeader from '~/components/MyHeader.vue'
import Loading from '~/components/Loading.vue'
export default {
  components: {
    SideNavi,
    MyHeader,
    Loading
  },
  methods: {
    handleResize () {
      const device = (window.innerWidth >= 960) ? 'pc'
        : (window.innerWidth >= 768) ? 'table'
          : 'sp'
      this.$store.commit('SET_DEVICE', device)
    }
  },
  mounted () {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped>

  #main {
    margin-left: 220px;
    position: relative;
  }
  #main .container {
    position: relative;
    padding: 86px 30px 30px;
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
    z-index: 10;
  }
  @media screen and (max-width: 959px){
    #main {
      margin-left: 64px;
    }
    .my-header {
      width: calc(100% - 64px);
    }
  }
</style>
