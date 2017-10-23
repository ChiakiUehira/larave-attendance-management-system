<template>
    <section>
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
      PieChart
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
        padding:80px 0px;
    }
</style>