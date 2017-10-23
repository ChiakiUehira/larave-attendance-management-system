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
        <i class="fa fa-home"></i>
        <span slot="title">Home</span>
      </el-menu-item>
      <el-menu-item index="/news">
        <i class="fa fa-th-list"></i>
        <span slot="title">News</span>
      </el-menu-item>
      <el-menu-item index="/state">
        <i class="fa fa-clock-o"></i>
        <span slot="title">State</span>
      </el-menu-item>
      <el-menu-item index="/report">
        <i class="fa fa-bar-chart"></i>
        <span slot="title">Report</span>
      </el-menu-item>
      <el-menu-item v-if="isManeger" index="/management">
        <i class="fa fa-cog"></i>
        <span slot="title">Management</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
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
  i.fa {
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
