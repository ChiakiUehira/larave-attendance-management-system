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
      <el-form :inline="true" class="controller">
        <el-form-item>
          <el-button @click="$router.push('/report')" type="primary" >今月</el-button>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button @click="handleCurrentChangeOfDate(prevMouthContext)" type="primary" icon="el-icon-arrow-left"></el-button>
            <el-button @click="handleCurrentChangeOfDate(nextMouthContext)" type="primary"><i class="el-icon-arrow-right el-icon-right"></i></el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="toDatePickerValue"
            @change="handleDatePicker"
            type="daterange"
            :clearable="false"
            start-placeholder="Start Date"
            end-placeholder="End Date">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div class="contents">
        <el-table
          style="width: 100%"
          :data="toValue"
          max-height="750"
          :row-class-name="tableRowClassName"
          class="el-table"
          @row-click="handleRowClick"
          >
          <el-table-column
            prop="displayDate"
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
    asyncData ({app, store, route}) {
      const params = route.query

      const from = (params.from && moment(params.from).isValid())
        ? moment(params.from).format('YYYY-MM-DD')
        : moment().startOf('month').format('YYYY-MM-DD')

      const to = (params.to && moment(params.to).isValid())
        ? moment(params.to).format('YYYY-MM-DD')
        : moment().endOf('month').format('YYYY-MM-DD')

      return {
        from,
        to,
        toDatePickerValue: [from, to]
      }
    },
    methods: {
      handleClick (tab, event) {
        this.currentView = this.activeName
      },
      handleRowClick (row) {
        if (row.id) {
          return this.$router.push('/attendance/' + row.id)
        }
      },
      tableRowClassName({ row }) {
        let classes = []
        if (row.id) {
          classes.push('attended-row')
        }
        if (row.date === moment().format('YYYY-MM-DD')) {
          classes.push('today-row')
        }
        if (classes.indexOf('today-row') === -1 && ((row.startedAt && !row.endedAt) || (!row.startedAt && row.endedAt))) {
          classes.push('error-row')
        }
        return classes.join(',').replace(/\,/g, ' ')
      },
      handleCurrentChangeOfDate (date) {
        let context = {}
        if (date.from) {
          context.from = moment(date.from).format('YYYY-MM-DD')
        }
        if (date.to) {
          context.to = moment(date.to).format('YYYY-MM-DD')
        }
        return this.$router.push({query: context})
      },
      handleDatePicker (date) {
        const [from,to] = date
        const context = {
          from: moment(from).format('YYYY-MM-DD'),
          to: moment(to).format('YYYY-MM-DD')
        }
        return this.$router.push({query: context})
      }
    },
    components: {
      LineChart,
      PieChart,
      ContentsName
    },
    computed: {
      attendances () {
        return this.$store.state.attendances
      },
      currentDate () {
        return moment().endOf('month').format('YYYY-MM')
      },
      period () {
        const from = moment(this.from)
        const to = moment(this.to)
        const step =  to.diff(from, 'days')
        return Number(step)
      },
      // ここの設計うまくないかも
      toValue() {
        let attendances = []
        for (let i = 0; i <= this.period; i++) {
          const date = moment(this.from).clone().add('days', i).format('YYYY-MM-DD')
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
            id: attendance ? attendance.id : null,
            date,
            displayDate: `${date} ${moment(date).format('(ddd)')}`,
            startedAt: startedAt ? startedAt.isValid() ? startedAt.format('HH:mm') : '' : '',
            endedAt: endedAt ? endedAt.isValid() ? endedAt.format('HH:mm') : '' : '',
            jobedAt: jobedAt ? `${jobedAt.hours()}:${jobedAt.minutes()}` : ''
          })
        }
        return attendances
      },
      nextMouthContext() {
        const from = moment(this.from).add(1, 'month').startOf('month').format('YYYY-MM-DD')
        const to = moment(this.to).add(1, 'month').endOf('month').format('YYYY-MM-DD')
        return {from, to}
      },
      prevMouthContext() {
        const from = moment(this.from).subtract(1, 'month').startOf('month').format('YYYY-MM-DD')
        const to = moment(this.to).subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
        return {from, to}
      }
    },
    // @TODO storeにたまったものを使いまわしたい
    async fetch ({app, store, route}) {
      const params = route.query
      const { data } = await app.$http.get('/attendance', { params })
      store.commit('SET_ATTENDANCES', data.attendances)
    }
  }
</script>

<style scoped>
  .controller {
    text-align: right;
    background: #fff;
    padding: 25px 10px;
    margin-bottom: 10px;
  }
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
  .el-form--inline .el-form-item {
    vertical-align: bottom;
    margin-bottom: 0
  }
  .el-table .error-row {
    background-color: #ffe2e2;
  }
  .el-table .today-row {
    background-color: #f5f7fb;
  }
  .el-table .attended-row {
    cursor: pointer;
  }
</style>
