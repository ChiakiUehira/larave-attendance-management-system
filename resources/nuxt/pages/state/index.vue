<template>
    <div>
        <contents-name >
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>ステート</el-breadcrumb-item>
            </el-breadcrumb>
        </contents-name>

        <el-tabs @tab-click="changeTab" v-model="activeName">
            <el-tab-pane label="勤怠" name="Attendance"></el-tab-pane>
            <el-tab-pane label="Me" name="Me"></el-tab-pane>
        </el-tabs>
        <components :is="currentView"></components>
    </div>
</template>
<script>
  import ContentsName from '@/components/ContentsName.vue'
  import Me from './_Component/Me.vue'
  import Attendance from './_Component/Attendance.vue'
  export default {
    components: {
      ContentsName,
      Me,
      Attendance
    },
    async fetch ({app, store}) {
      if (!store.state.me) {
        const { data } = await app.$http.get('/me')
        store.commit('SET_ME', data.me)
      }
    },
    data() {
      return {
        currentView: 'Attendance',
        activeName: ''
      }
    },
    methods:{
      changeTab(){
        this.currentView = this.activeName
      }
    }
  }
</script>

<style scoped>
.el-tabs{
    margin-bottom:10px;
    background: #fff;
    padding:10px;
}
</style>
