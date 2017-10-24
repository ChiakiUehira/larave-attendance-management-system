<template>
  <div>
    <el-menu theme="dark" class="el-menu-vertical" :router="true" :collapse="isCollapse">
      <div class="profile">
        <div class="profile__image">
          <nuxt-link :to="`/me`">
            <img :src="me.thumbnail" alt="">
          </nuxt-link>
        </div>
      </div>
      <el-menu-item index="/">
        <icon name="home"></icon>
        <span slot="title">Home</span>
      </el-menu-item>
      <el-menu-item index="/news">
        <icon name="list"></icon>
        <span slot="title">News</span>
      </el-menu-item>
      <el-menu-item index="/state">
        <icon name="clock-o"></icon>
        <span slot="title">State</span>
      </el-menu-item>
      <el-menu-item index="/report">
        <icon name="bar-chart"></icon>
        <span slot="title">Report</span>
      </el-menu-item>
      <el-menu-item v-if="isManeger" index="/management">
        <icon name="cog"></icon>
        <span slot="title">Management</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import 'vue-awesome/icons'
  import Icon from 'vue-awesome/components/Icon'
export default {
  components: {
    Icon
  },
  data() {
    return {}
  },
  computed: {
    isCollapse () {
      return this.$store.state.device !== 'pc'
    },
    isManeger () {
      return this.$store.state.isManager
    },
    me () {
      return this.$store.state.me
    }
  }
}
</script>
<style>
  .el-menu {
    border-radius: 0;
  }
  .el-menu-vertical {
    position: fixed;
    top: 0;
    left: 0;
    /* important */
    height: 110%;
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 220px;
  }
</style>

<style scoped>
  .fa-icon {
    width: auto;
    height: 1em; /* or any other relative font sizes */

    /* You would have to include the following two lines to make this work in Safari */
    max-width: 100%;
    max-height: 100%;
    margin-right: 5px;
    width: 24px;
    text-align: center;
  }
  .profile {
    text-align: center;
    padding: 20px 0 20px;
    background: #2d3a4c;
  }
  .profile__image {
    width: 100px;
    display: inline-block;
  }
  .profile__image img {
    border: 5px solid #334257;
    border-radius: 100%;
  }
  @media screen and (max-width: 959px){
    .profile__image {
      width: 50px;
    }
  }
</style>
