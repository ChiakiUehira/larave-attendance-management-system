<template>
  <div>
    <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" :router="true">
      <el-menu-item index="/">ARTICLES</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  computed:{
    isLogin(){
      return this.$store.state.isLogin
    }
  }
}
</script>
