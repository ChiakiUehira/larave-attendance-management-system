<template>
    <section>
      <contents-name >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>レポート</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
      <el-tabs @tab-click="handleClick" v-model="activeName">
          <el-tab-pane label="ヒストグラフ" name="LineChart"></el-tab-pane>
          <el-tab-pane label="円グラフ" name="PieChart"></el-tab-pane>
      </el-tabs>
      <el-card>
      <components :is="currentView"></components>
      </el-card>
  </section>
</template>
<script>
  import LineChart from './_ChartComponent/Line.vue'
  import PieChart from './_ChartComponent/Pie.vue'
  import ContentsName from '~/components/ContentsName.vue'
  export default{
    data(){
      return {
        currentView: "LineChart",
        activeName:""
      }
    },
    methods:{
      handleClick(tab, event){
        this.currentView = this.activeName
      }
    },
    components: {
      LineChart,
      PieChart,
      ContentsName
    },
    computed: {
      me () {
        return this.$store.state.me
      }
    },
    async fetch ({app, store}) {
      if (!store.state.me) {
        const {data} = await app.$http.get('/me')
        store.commit('SET_ME', data.me)
      }
    }
  }
</script>

<style>
    .el-tabs{
        margin-bottom:10px;
        background: #fff;
        padding:10px;
    }
    .el-card{
        padding:40px 0px;
    }
</style>