<template>
  <div>
    <contents-name >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>レポート</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
      <el-form :inline="true" class="controller">
        <el-form-item>
          <el-button icon="el-icon-date" @click="$router.push('/report')" type="primary" >今月</el-button>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button @click="handleCurrentChangeOfDate(prevMouthContext)" type="primary" icon="el-icon-arrow-left"></el-button>
            <el-button @click="handleCurrentChangeOfDate(nextMouthContext)" type="primary"><i class="el-icon-arrow-right el-icon-right"></i></el-button>
          </el-button-group>
        </el-form-item>
      </el-form>
      <div class="info">
        <div class="info__inner">
          <div class="info__period">
            <p class="info__name">期間</p>
            <div class="info__period--body">
              <span class="info__period--from">{{displayFrom}}</span>
              <span class="info__period--delimiter">~</span>
              <span class="info__period--to">{{displayTo}}</span>
            </div>
          </div>
          <div class="info__attendedDaysCount">
            <p class="info__name">出勤日数</p>
            <div class="info__attendedDaysCount--body">
              <span class="info__attendedDaysCount--value">{{attendedDaysCount}}日</span>
            </div>
          </div>
          <div class="info__attendedTimesCount">
            <p class="info__name">労働時間</p>
            <div class="info__attendedTimesCount--body">
              <span class="info__attendedTimesCount--value">{{displayAttendedTimesCount}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="contents">
        <div class="calendar">
          <div class="calendar__body">
            <div v-for="(day,index) in displayToValue" :key="day.id" @click="onShow(day)" :class="['calendar__body--item',day.isPadding ? 'isPadding' : '',day.isAttend ? 'isAttend' : '']">
              <div :class="['calendar__body--item--day',day.isSunday ? 'isSunday' : '',day.isSaturday ? 'isSaturday' : '',]" v-if="index < 7">
                {{dayMap[index]}}
              </div>
              <div :class="['calendar__body--item--day',day.isSunday ? 'isSunday' : '',day.isSaturday ? 'isSaturday' : '',]">
                {{formatDays(day.date)}}
              </div>
              <div class="calendar__body--attendances">
                <div class="calendar__body--attendance" v-for="attendance in day.attendances" :key="attendance.id">
                  {{formatTime(attendance.started_at)}}
                  ~
                  {{formatTime(attendance.ended_at)}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
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
        attendedDaysCount: 0,
        attendedTimesCount: 0,
      }
    },
    components: {
      ContentsName
    },
    methods: {
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
      formatDays (str) {
        return moment(str).format('DD')
      },
      formatTime (str) {
        return moment(str).format('HH:mm')
      },
      onShow (day) {
        if (day.attendances.length) {
          this.$router.push('/report/' + day.date)
        }
      }
    },
    computed: {
      dayMap () {
        return ['日','月','火','水','木','金','土',]
      },
      attendances () {
        return this.$store.state.attendances
      },
      period () {
        const from = moment(this.from)
        const to = moment(this.to)
        const step =  to.diff(from, 'days')
        return Number(step)
      },
      displayToValue () {
        const firstPadding = Array.from({length: this.firstDayOfTheMonth}, (_, i) => {
          const date = moment(this.from).clone().subtract('days',this.firstDayOfTheMonth - i).format('YYYY-MM-DD')
          return {
            date,
            attendances: [],
            isAttend: false,
            isPadding: true,
            isSunday: moment(date).day() === 0,
            isSaturday: moment(date).day() === 6
          }
        })
        const lastPadding = Array.from({length: 6 - this.endDayOfTheMonth}, (_, i) => {
          const date = moment(this.to).clone().add('days',i + 1).format('YYYY-MM-DD')
          return {
            date,
            attendances: [],
            isAttend: false,
            isPadding: true,
            isSunday: moment(date).day() === 0,
            isSaturday: moment(date).day() === 6
          }
        })
        return [
          ...firstPadding,
          ...this.toValue,
          ...lastPadding
        ]
      },
      toValue() {
        let calendar = []
        let attendedDaysCount = 0
        let attendedTimesCount = 0
        for (let i = 0; i <= this.period; i++) {
          let isAttend = false
          const date = moment(this.from).clone().add('days', i).format('YYYY-MM-DD')
          const attendances = this.attendances.filter((attendance) => {
            return date === moment(attendance.started_at).format('YYYY-MM-DD')
          })
          if (attendances.length) {
            attendedDaysCount += attendances.length
            attendances.forEach(attendance => {
              const startedAt = attendance ? moment(attendance.started_at) : null
              const endedAt = attendance ? moment(attendance.ended_at) : null
              const diff = startedAt ? endedAt ? endedAt.diff(startedAt) : null : null
              if (diff) {
                attendedTimesCount += diff
              }
              isAttend = true
            });
          }
          calendar.push({
            date,
            attendances,
            isAttend,
            isPadding: false,
            isSunday: moment(date).day() === 0,
            isSaturday: moment(date).day() === 6
          })
        }
        this.attendedDaysCount = attendedDaysCount
        this.attendedTimesCount = attendedTimesCount
        return calendar
      },
      firstDayOfTheMonth () {
        return moment(this.from).day()
      },
      endDayOfTheMonth () {
        return moment(this.to).day()
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
      },
      displayFrom () {
        return moment(this.from).format('YYYY年MM月DD日')
      },
      displayTo () {
        return moment(this.to).format('YYYY年MM月DD日')
      },
      displayAttendedTimesCount () {
        const duration = moment.duration(this.attendedTimesCount)
        const asMin = duration.asMinutes()
        const hours = Math.floor(asMin / 60)
        const min = Math.floor(asMin - (hours * 60))
        return `${hours}時間${min}分`
      }
    },
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
  .info {
    background: #fff;
    padding: 25px;
    margin-bottom: 10px;
  }
  .info__name {
    display: inline-block;
    color: #5a5e66;
    width: 80px;
    text-align: right;
    margin-right: 20px;
  }
  .info__period {
    margin-bottom: 10px;
  }
  .info__period--body {
    display: inline-block;
    color: #5a5e66;
  }
  .info__period--delimiter {
    display: inline-block;
    padding: 0 5px;
  }
  .info__attendedDaysCount {
    margin-bottom: 10px;
  }
  .info__attendedDaysCount--body {
    display: inline-block;
    color: #5a5e66;
  }
  .info__attendedTimesCount--body {
    display: inline-block;
    color: #5a5e66;
  }
  .contents{
    background: #fff;
  }
  .calendar__body {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #DFDFDF;
    border-right: none;
    border-bottom: none;
  }
  .calendar__body--item {
    width: 14.28%;
    border: 1px solid #DFDFDF;
    border-left: none;
    border-top: none;
    padding: 10px;
    height: 150px;
  }
  .calendar__body--item--day {
    margin-bottom: 5px;
  }
  .isSunday {
    color: #F56C6C;
  }
  .isSaturday {
    color: #409EFF;
  }
  .isPadding {
    background: #f4f4f4;
  }
  .isAttend {
    cursor: pointer;
  }
  .isAttend:hover {
    background: #ecf5ff;
  }
  .calendar__body--attendances {
    margin-top: 10px;
  }
  .calendar__body--attendance {
    background: #409EFF;
    color: #fff;
    padding: 3px;
    font-size: 13px;
  }
</style>
