<template>
  <div>
    <contents-name >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/report' }">レポート</el-breadcrumb-item>
        <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
    <div class="alerts">
      <el-alert
        v-if="isErrors"
        title="エラーがあります。"
        type="error"
        :closable="false"
        description="マネージャーに修正依頼をしてください。"
        show-icon>
      </el-alert>
    </div>
    <div class="info">
      <div class="info__body">
        <div class="info__items">
          <div class="info__item">
            <div class="info__item--head">日付</div>
            <div class="info__item--body">{{title}}</div>
          </div>
          <div class="info__item">
            <div class="info__item--head">労働時間</div>
            <div class="info__item--body">{{displayTotalWorkingTime}}</div>
          </div>
          <div class="info__item">
            <div class="info__item--head">休憩時間</div>
            <div class="info__item--body">{{displayTotalRestingTime}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="timelines" v-for="attendance in displayAttendances" :key="attendance.id">
      <div :class="['timeline', 'start', {'err': !isValid(attendance.started_at)}]">
        <div class="timeline__body">
          <p>
            出勤 -
            <span :class="[{'err': !isValid(attendance.started_at)}]">{{toDisplayDate(attendance.started_at)}}</span>
          </p>
        </div>
      </div>
      <div class="rests border" v-for="rest in attendance.rest" :key="rest.id">
        <div :class="['timeline', 'rest', {'err': !isValid(rest.started_at)}]">
          <div class="timeline__body">
            <p>
              休憩開始 -
              <span :class="[{'err': !isValid(rest.started_at)}]">{{toDisplayDate(rest.started_at)}}</span>
            </p>
          </div>
        </div>
        <div :class="['timeline', 'rest end', 'border', {'err': !isValid(rest.ended_at)}]">
          <div class="timeline__body">
            <p>
              休憩終了 -
              <span :class="[{'err': !isValid(rest.ended_at)}]">{{toDisplayDate(rest.ended_at)}}</span>
            </p>
          </div>
        </div>
      </div>
      <div :class="['timeline', 'end', 'border', {'err': !isValid(attendance.ended_at)}]">
        <div class="timeline__body">
          <p>
            退勤 -
            <span :class="[{'err': !isValid(attendance.ended_at)}]">{{toDisplayDate(attendance.ended_at)}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ContentsName from '~/components/ContentsName.vue'
import moment from 'moment'
export default {
  async asyncData ({app, store, route}) {
    const date = route.params.id
    const { data } = await app.$http.get('/attendance/getByDate', { params: { date }})
    return {
      attendances: data.attendances,
      isErrors: false
    }
  },
  methods: {
    toDisplayDate (date) {
      return moment(date).isValid() ? moment(date).format('HH:mm') : '登録記録がありません'
    },
    // 副作用あり
    isValid (date) {
      const isValid =  moment(date).isValid()
      if (!isValid) {
        this.isErrors = true
      }
      return isValid
    }
  },
  validate ({ params }) {
    return moment(params.id).isValid()
  },
  components: {
    ContentsName
  },
  computed: {
    title () {
      return this.$route.params.id
    },
    displayAttendances () {
      let attendances = JSON.parse(JSON.stringify(this.attendances)).sort((a, b) => {
        return (a.started_at < b.started_at) ? -1 : 1
      })
      return attendances.map((attendance) => {
        attendance.rest = JSON.parse(JSON.stringify(attendance.rest)).sort((a, b) => {
          return (a.started_at < b.started_at) ? -1 : 1
        })
        return attendance
      })
    },
    displayIsErrors () {
      return this.isErrors ? '有' : '無'
    },
    totalWorkingTime () {
      let total = 0
      this.attendances.forEach(element => {
        const startedAt = moment(element.started_at)
        const diff = moment(element.ended_at).diff(startedAt)
        total += diff
      });
      return total
    },
    displayTotalWorkingTime () {
      if (!this.totalWorkingTime) {
        return ''
      }
      const duration = moment.duration(this.totalWorkingTime)
      const asMin = duration.asMinutes()
      const hours = Math.floor(asMin / 60)
      const min = Math.floor(asMin - (hours * 60))
      return `${hours}時間${min}分`
    },
    totalRestingTime () {
      let restObjects = []
      let total = 0
      this.attendances.forEach(element => {
        restObjects = [...restObjects, ...element.rest]
      });
      restObjects.forEach(element => {
        const startedAt = moment(element.started_at)
        const diff = moment(element.ended_at).diff(startedAt)
        total += diff
      });
      return total
    },
    displayTotalRestingTime () {
      if (!this.totalRestingTime) {
        return ''
      }
      const duration = moment.duration(this.totalRestingTime)
      const asMin = duration.asMinutes()
      const hours = Math.floor(asMin / 60)
      const min = Math.floor(asMin - (hours * 60))
      return `${hours}時間${min}分`
    }
  }
}
</script>
<style scoped>
  .alerts {
    margin-bottom: 10px;
  }
  .info {
    position: relative;
    padding: 20px 25px;
    background-color: #fff;
    margin-bottom: 10px;
    border-radius: 2px;
  }
  .info__item:not(:last-child) {
    margin-bottom: 10px;
  }
  .info__item--head {
    display: inline-block;
    text-align: right;
    width: 90px;
  }
  .info__item--body {
    margin-left: 10px;
    display: inline-block;
  }
  .timelines {
    position: relative;
    padding: 20px;
    background: #f2f2f2;
  }
  .timelines:not(:last-child) {
    margin-bottom: 100px;
  }
  .timelines:not(:last-child):after {
    content: "";
    display: inline-block;
    position: absolute;
    width: 5px;
    height: 80px;
    background: #cdcdce;
    bottom: -90px;
    left: 25px;
  }
  .timeline {
    position: relative;
    padding: 20px 25px;
    background-color: #fff;
    margin-bottom: 50px;
    border-radius: 2px;
  }
  .timeline.start {
    border-left: #419cff solid 15px;
  }
  .timeline.end {
    border-left: #67C23A solid 15px;
    margin-bottom: 0;
  }
  .timeline.rest {
    border-left: #E6A23C solid 15px;
  }
  .timeline.err {
    border-left: #F56C6C solid 15px;
  }
  .timeline.border:after {
    content: "";
    display: inline-block;
    position: absolute;
    width: 5px;
    height: 30px;
    background: #cdcdce;
    top: -40px;
    left: -10px;
  }
  .timeline__body span.err {
    color: #F56C6C;
  }
  .rests {
    position: relative;
    padding: 20px;
    background: #eeeeee;
    margin-bottom: 50px;
  }
  .rests.border:after {
    content: "";
    display: inline-block;
    position: absolute;
    width: 5px;
    height: 30px;
    background: #cdcdce;
    top: -40px;
    left: 5px;
  }
  .rest.end {
    margin-bottom: 0;
  }
</style>
