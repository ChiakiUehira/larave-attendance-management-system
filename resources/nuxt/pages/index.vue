<template>
  <div>
    <contents-name>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>ホーム</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
    <div class="page">
    </div>
  </div>
</template>

<script>
  import ContentsName from '@/components/ContentsName.vue'
  export default {
    data () {
      return {
      }
    },
    components: {
      ContentsName
    },
  }
</script>

<style scoped>
</style>