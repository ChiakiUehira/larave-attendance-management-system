<template>
  <contents-name >
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/report' }">レポート</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </contents-name>
</template>
<script>
import ContentsName from '~/components/ContentsName.vue'
import moment from 'moment'
export default {
  components: {
    ContentsName
  },
  computed: {
    attendace () {
      const id = this.$route.params.id
      return this.$store.state.attendances.find(attendance => attendance.id === Number(id))
    },
    title () {
      return moment(this.attendace.stared_at).format('YYYY年MM月DD日')
    }
  }
}
</script>
<style scoped>

</style>


