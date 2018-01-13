<template>
  <div>
    <contents-name>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>ステート</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
    <div class="state" :style="{borderLeft:'solid 15px' + borderColor, borderRight:'solid 15px' + borderColor}">
      <div class="state-text">
        <span class="state-text" v-if="active == 0">未出勤</span>
        <span class="state-text" v-if="active == 1">出勤中</span>
        <span class="state-text" v-if="active == 2">休憩中</span>
        <span class="state-text" v-if="active == 3">退勤済み</span>
      </div>
      <div class="time">
        {{ time }}
      </div>
    </div>

    <div class="page">
      <div class="attendance">
        <el-card class="contents">
          <div class="time-elm">
            <div class="start_time" v-if="attendance.startedAt"><strong
                class="el-icon-time">出勤：{{attendance.startedAt}}</strong></div>
            <div class="start_time" v-else><strong class="el-icon-time">出勤：--:-- </strong></div>
            <div class="end_time" v-if="attendance.endedAt"><strong
                class="el-icon-time">退勤：{{attendance.endedAt}}</strong></div>
            <div class="end_time" v-else><strong class="el-icon-time">退勤：--:-- </strong></div>
          </div>
        </el-card>
        <div class="contents">
          <div class="attendance-btn" @click="startFormVisible = true"><span>出勤</span></div>
          <div class="attendance-btn" @click="restStartFormVisible = true" v-if="!isRest && active == 1"><span>休憩</span></div>
          <div class="attendance-btn" @click="restEndFormVisible = true" v-if="isRest"><span>復帰</span></div>
          <div class="attendance-btn" @click="endFormVisible = true"><span>退勤</span></div>
        </div>
      </div>
      <el-dialog title="出勤" :visible.sync="startFormVisible" width="30%">
        <span>出勤しますか？</span>
        <span slot="footer" class="dialog-footer">
              <el-button @click="startFormVisible = false">キャンセル</el-button>
              <el-button type="primary" @click="start">確認</el-button>
            </span>
      </el-dialog>
      <el-dialog title="休憩" :visible.sync="restStartFormVisible" width="30%">
        <span>休憩しますか？</span>
        <span slot="footer" class="dialog-footer">
              <el-button @click="restStartFormVisible = false">キャンセル</el-button>
              <el-button type="primary" @click="restStart">確認</el-button>
            </span>
      </el-dialog>
      <el-dialog title="休憩" :visible.sync="restEndFormVisible" width="30%">
        <span>休憩から復帰しますか？</span>
        <span slot="footer" class="dialog-footer">
              <el-button @click="restEndVisible = false">キャンセル</el-button>
              <el-button type="primary" @click="restEnd">確認</el-button>
            </span>
      </el-dialog>
      <el-dialog title="退勤" :visible.sync="endFormVisible" width="30%">
        <span>今日も１日お疲れ様でした!</span>
        <span slot="footer" class="dialog-footer">
              <el-button @click="endFormVisible = false">キャンセル</el-button>
              <el-button type="primary" @click="stop">確認</el-button>
            </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import ContentsName from '@/components/ContentsName.vue'
  import moment from 'moment'
  export default {
    components: {
      ContentsName
    },
    async fetch ({app, store}) {
      if (!store.state.me) {
        const {data} = await app.$http.get('/me')
        store.commit('SET_ME', data.me)
      }
    },
    async asyncData ({app}){
      const {data} = await app.$http.get('/attendance/lastUpdated')
      if (data.attendance != null && data.attendance.ended_at == null) {
        const obj = await app.$http.get('/rest/lastUpdated')
        if(obj.data.rest.ended_at == null){
          return {
            attendance: {
              startedAt: moment(data.attendance.started_at).format('HH:mm'),
              endedAt: '',
            },
            active: 2,
            time: moment().format("HH:mm:ss")
          }
        }
        else{
          return {
            attendance: {
              startedAt: moment(data.attendance.started_at).format('HH:mm'),
              endedAt: '',
            },
            active: 1,
            time: moment().format("HH:mm:ss")
          }
        }
      }
      return {time: moment().format("HH:mm:ss")}
    },
    mounted(){
      this.$client.emit('user', this.$store.state.me.id)
      setInterval(() => {
        this.time = moment().format("HH:mm:ss")
      }, 500)
    },
    computed: {
      isRest(){
        return this.active === 2
      },
      borderColor (){
        if (this.active === 0) {
          return "#8A8A8A"
        }
        if (this.active === 1) {
          return "#409EFF"
        }
        if (this.active === 2) {
          return "#EB9E05"
        }
        if (this.active === 3) {
          return "#67C23A"
        }
      }
    },
    data () {
      return {
        active: 0,
        form: {
          name: '',
        },
        startFormVisible: false,
        restStartFormVisible: false,
        restEndFormVisible: false,
        endFormVisible: false,
        attendance: {
          startedAt: '',
          endedAt: '',
        }
      }
    },
    methods: {
      async start () {
        this.reset()
        this.active = 1
        this.startFormVisible = false
        const {data} = await this.$http.post('/attendance/start')
        this.$notify.success('出勤しました')
        this.attendance.startedAt = moment(data.attendance.started_at).format('HH:mm')
        this.$client.emit(this.$store.state.me.id, "出勤中")
      },
      async restStart () {
        this.attendance.restEndedAt = ''
        this.restStartFormVisible = false
        this.active = 2
        const {data} = await this.$http.post('/rest/start')
        this.$notify.success('休憩に入りました')
        this.attendance.restStartedAt = moment(data.rest.started_at).format('HH:mm')
      },
      async restEnd () {
        this.restEndFormVisible = false
        this.active = 1
        const {data} = await this.$http.post('/rest/end')
        this.$notify.success('復帰しました')
        this.attendance.restEndedAt = moment(data.rest.ended_at).format('HH:mm')
      },
      async stop () {
        this.active = 3
        this.endFormVisible = false
        const {data} = await this.$http.post('/attendance/end')
        this.$notify.success('本日もお疲れ様でした')
        this.attendance.endedAt = moment(data.attendance.ended_at).format('HH:mm')
      },
      reset (){
        this.active = 0
        this.attendance = {
          startedAt: '',
          restStartedAt: '',
          restEndedAt: '',
          endedAt: '',
        }
      }
    }
  }
</script>

<style scoped>
  .el-card {
    padding: 40px 20px;
  }

  .page {
    background-color: #fff;
    padding: 40px;
  }

  .attendance {
    margin: 0 auto;
  }

  .contents {
    margin: 0 auto;
    text-align: center;
    width: 49%;
    border-radius: 3px;
    display: inline-block;
    vertical-align: middle;
  }

  .contents:last-child {
    margin-left: 2%;
  }

  .contents .start_time {
    padding: 30px;
    letter-spacing: 2px;
    font-weight: 300;
    color: #5A5E66;
    font-size: 20px;
  }

  .contents .end_time {
    padding: 30px;
    letter-spacing: 2px;
    font-weight: 300;
    color: #5A5E66;
    font-size: 20px;
  }

  .contents .attendance-btn {
    margin: 0 auto;
    margin-bottom: 30px;
    padding: 30px;
    background: #fff;
    color: #fff;
    border: 1px solid #e6ebf5;
    border-radius: 3px;
    letter-spacing: 2px;
    box-sizing: border-box;
    width: 70%;
    transition: ease .3s;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    cursor: pointer;
    text-align: center;
    display: inline-block;
  }

  .contents .attendance-btn:hover {
    box-shadow: 0 6px 12px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  }

  .contents .attendance-btn:last-child {
    margin-bottom: 0;
  }

  .contents .attendance-btn span {
    color: #5A5E66;
  }

  .state {
    background: #fff;
    text-align: center;
    padding: 30px 20px;
    margin-bottom: 10px;
  }

  .state-text {
    color: #5A5E66;
    letter-spacing: 1px;
    font-size: 40px;
    display: inline-block;
  }

  .time {
    padding-top:10px;
    font-size: 20px;
    text-align: center;
    color:#5A5E66;
  }
</style>
