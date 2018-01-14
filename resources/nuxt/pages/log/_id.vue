<template>
  <div>
    <contents-name>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">ホーム</el-breadcrumb-item>
        <el-breadcrumb-item >フィード詳細</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>

    <div class="contents">
      <log-user v-if="log.type === 'user'" :log="log"></log-user>
      <log-company v-if="log.type === 'company'" :log="log"></log-company>
      <log-group v-if="log.type === 'group'" :log="log"></log-group>
    </div>
  </div>
</template>

<script>
  import LogUser from '~/components/LogUser.vue'
  import LogGroup from '~/components/LogGroup.vue'
  import LogCompany from '~/components/LogCompany.vue'
  import ContentsName from '~/components/ContentsName.vue'
  export default{
    components:{
      ContentsName,
      LogUser,
      LogGroup,
      LogCompany
    },
    async asyncData({app, params}){
      const {data} = await app.$http.get(`log/${params.id}`)
      return {log: data.log}
    }
  }
</script>