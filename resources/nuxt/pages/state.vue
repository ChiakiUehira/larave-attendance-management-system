<template>
  <div>
    <contents-name >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>ステート</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
    <div class="page">
      <div class="contents">
        <el-button type="primary" @click="start">出勤</el-button>
        <el-button type="primary">退勤</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import ContentsName from '@/components/ContentsName.vue'
export default {
  components: {
    ContentsName
  },
  computed: {

  },
  methods: {
    start () {

    }
  },
  async fetch ({app, store}) {
    if (!store.state.me) {
      const { data } = await app.$http.get('/me')
      store.commit('SET_ME', data.me)
    }
  }
}
</script>

<style scoped>
  .contents {
    border-radius: 2px;
    background-color: #fff;
    padding: 30px;
  }
</style>
