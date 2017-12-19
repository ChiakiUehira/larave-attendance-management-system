<template>
  <div>
    <contents-name >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/report' }">レポート</el-breadcrumb-item>
        <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
    <div class="timelines" v-for="attendance in attendances" :key="attendance.id">
      <div class="timeline start">
        <div class="timeline__body">
          <p>出勤 - {{toDisplayDate(attendance.started_at)}}</p>
        </div>
      </div>
      <div class="rests" v-for="rest in attendance.rest" :key="rest.id">
        <div class="timeline rest border">
          <div class="timeline__body">
            <p>休憩開始 - {{toDisplayDate(rest.started_at)}}</p>
          </div>
        </div>
        <div class="timeline rest border">
          <div class="timeline__body">
            <p>休憩終了 - {{toDisplayDate(rest.ended_at)}}</p>
          </div>
        </div>
      </div>
      <div class="timeline end border">
        <div class="timeline__body">
          <p>退勤 - {{toDisplayDate(attendance.ended_at)}}</p>
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
    console.log(data);
    return {
      attendances: data.attendances
    }
  },
  methods: {
    toDisplayDate (date) {
      return moment(date).format('HH:mm')
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
    }
  }
}
</script>
<style scoped>
  .timelines {
    position: relative;
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
    left: 4px;
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
  }
  .timeline.rest {
    border-left: #E6A23C solid 15px;
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
</style>


