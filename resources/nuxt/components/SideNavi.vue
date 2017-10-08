<template>
  <div>
    <el-menu theme="dark" class="el-menu-vertical" :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-message"></i>
          <span slot="title">Navigator One</span>
        </template>
        <el-menu-item-group>
          <span slot="title">Group One</span>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">item four</span>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">Navigator Three</span>
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