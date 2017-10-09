<template>
  <div>
    <el-menu theme="dark" class="el-menu-vertical" :router="true" :collapse="isCollapse">
      <el-menu-item index="/me">
        <i class="el-icon-star-off"></i>
        <span slot="title">Me</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">Home</span>
      </el-menu-item>
      <el-menu-item index="/news">
        <i class="el-icon-information"></i>
        <span slot="title">News</span>
      </el-menu-item>
      <el-menu-item index="/state">
        <i class="el-icon-time"></i>
        <span slot="title">State</span>
      </el-menu-item>
      <el-menu-item index="/report">
        <i class="el-icon-document"></i>
        <span slot="title">Report</span>
      </el-menu-item>
      <el-menu-item index="/management">
        <i class="el-icon-setting"></i>
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
      if (typeof(window) !== 'undefined') {
        return window.innerWidth < 960
      }
      return false
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
    height: 110%;
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 220px;
  }
</style>