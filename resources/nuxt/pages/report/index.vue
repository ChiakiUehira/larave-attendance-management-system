<template>
  <div>
    <contents-name >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>レポート</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
      <!-- <el-tabs @tab-click="handleClick" v-model="activeName">
          <el-tab-pane label="ヒストグラフ" name="LineChart"></el-tab-pane>
          <el-tab-pane label="円グラフ" name="PieChart"></el-tab-pane>
        </el-tabs> -->
      <!-- <div class="contents">
        <el-card>
          <components :is="currentView"></components>
        </el-card>
      </div> -->
      <el-button-group>
        <el-button type="primary" icon="el-icon-arrow-left"></el-button>
        <el-button type="primary"><i class="el-icon-arrow-right el-icon-right"></i></el-button>
      </el-button-group>
      <div class="contents">
        <el-table
          style="width: 100%"
          :data="toValue"
          :row-class-name="tableRowClassName"
          class="el-table"
          >
          <el-table-column
            prop="date"
            label="日付">
          </el-table-column>
          <el-table-column
            prop="startedAt"
            label="出勤">
          </el-table-column>
          <el-table-column
            prop="endedAt"
            label="退勤">
          </el-table-column>
          <el-table-column
            prop="jobedAt"
            label="労働時間">
          </el-table-column>
        </el-table>
      </div>
  </div>
</template>
<script>
  import LineChart from './_ChartComponent/Line.vue'
  import PieChart from './_ChartComponent/Pie.vue'
  import ContentsName from '~/components/ContentsName.vue'
  import moment from 'moment'
  export default{
    data () {
      return {
        currentView: 'LineChart',
        activeName: '',
      }
    },
    asyncData () {
      return {
        currentDate: moment().endOf('month').format('YYYY-MM')
      }
    },
    methods: {
      handleClick (tab, event) {
        this.currentView = this.activeName
      }
    },
    components: {
      LineChart,
      PieChart,
      ContentsName
    },
    methods: {
      tableRowClassName({row}) {
        if (row.date === moment().format('YYYY-MM-DD')) {
          return 'today-row'
        }
        if ((row.startedAt && !row.endedAt) || (!row.startedAt && row.endedAt)) {
          return 'error-row'
        }
        return ''
      }
    },
    computed: {
      me () {
        return this.$store.state.me
      },
      attendances () {
        return this.$store.state.attendances
      },
      lastDayOfMouth() {
        return Number(moment(this.currentDate).endOf('month').format('DD'))
      },
      toValue() {
        let attendances = []
        for (let i = 0; i < this.lastDayOfMouth; i++) {
          const date = moment(this.currentDate).clone().add('days', i).format('YYYY-MM-DD')
          const attendance = this.attendances.find((attendance) => {
            if (attendance.started_at) {
              return date === moment(attendance.started_at).format('YYYY-MM-DD')
            }
            if (attendance.ended_at) {
              return date === moment(attendance.ended_at).format('YYYY-MM-DD')
            }
          })
          const startedAt = attendance ? moment(attendance.started_at) : null
          const endedAt = attendance ? moment(attendance.ended_at) : null
          const diff = startedAt ? endedAt ? endedAt.diff(startedAt) : null : null
          const jobedAt = diff ? moment.duration(diff): null
          attendances.push({
            date,
            startedAt: startedAt ? startedAt.isValid() ? startedAt.format('HH:mm') : '' : '',
            endedAt: endedAt ? endedAt.isValid() ? endedAt.format('HH:mm') : '' : '',
            jobedAt: jobedAt ? `${jobedAt.hours()}:${jobedAt.minutes()}` : ''
          })
        }
        return attendances
      }
    },
    async fetch ({app, store}) {
      if (!store.state.attendances) {
        const { data } = await app.$http.get('/attendance')
        store.commit('SET_ATTENDANCES', data.attendances)
      }
    }
  }
</script>

<style scoped>
  .contents{
      background: #fff;
      padding:30px;
  }
  .el-tabs{
      margin-bottom:10px;
      background: #fff;
      padding:10px 20px;
  }
  .el-card{
      padding:40px 0px;
  }
</style>

<style>
  .el-table .error-row {
    background-color: #ffe2e2;
  }
  .el-table .today-row {
    background-color: #f5f7fb;
  }
</style>
