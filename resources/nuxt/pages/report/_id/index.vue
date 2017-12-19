<template>
  <div>
    <contents-name >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/report' }">レポート</el-breadcrumb-item>
        <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
    <div>

    </div>
  </div>
</template>
<script>
import ContentsName from '~/components/ContentsName.vue'
import moment from 'moment'
export default {
  async asyncData ({app, store, route}) {
    const id = route.params.id
    const { data } = await app.$http.get('/attendance/' + id)
    return {
      attendance: data.attendance
    }
  },
  components: {
    ContentsName
  },
  computed: {
    title () {
      return moment(this.attendance.created_at).format('YYYY年MM月DD日')
    }
  }
}
</script>
<style scoped>
  .page {
    border-radius: 2px;
  }
</style>


