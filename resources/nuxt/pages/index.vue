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
    async fetch({app,store}){
      if (!store.state.users) {
        const { data } = await app.$http.get('/user')
        store.commit('SET_USERS', data.users)
      }
      if (!store.state.groups) {
        const { data } = await app.$http.get('/group')
        store.commit('SET_GROUPS', data.groups)
      }
    }
  }
</script>

<style scoped>
</style>