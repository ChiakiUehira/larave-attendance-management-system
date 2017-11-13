<template>
  <div>
    <contents-name>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>ステート</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
    <div class="page">
      <el-steps :active="active" finish-status="success">
        <el-step title="出勤" icon="el-icon-edit-outline"></el-step>
        <el-step title="休憩" icon="el-icon-more"></el-step>
        <el-step title="退勤" icon="el-icon-time"></el-step>
      </el-steps>
      <div class="attendance">
        <el-card class="contents">
          <div class="time-elm">
            <div class="start_time"><strong class="el-icon-time">出勤：{{attendance.startedAt}}</strong></div>
            <div class="break_time"><strong class="el-icon-time">休憩：{{attendance.restStartedAt}} ~
              {{attendance.restEndedAt}}</strong></div>
            <div class="end_time"><strong class="el-icon-time">退勤：{{attendance.endedAt}}</strong></div>
          </div>
        </el-card>
        <div class="contents">
          <div class="attendance-btn" @click="startFormVisible = true"><span>出勤</span></div>
          <div class="attendance-btn" @click="rest"><span>休憩</span></div>
          <div class="attendance-btn" @click="endFormVisible = true"><span>退勤</span></div>
        </div>
      </div>
      <el-dialog title="出勤" :visible.sync="startFormVisible" width="30%">
        <el-form :model="form">
          <el-form-item label="今日の意気込み">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
              <el-button @click="startFormVisible = false">キャンセル</el-button>
              <el-button type="primary" @click="start">確認</el-button>
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
      if (!store.state.users) {
        const obj = await app.$http.get('/user')
        store.commit('SET_USERS', obj.data.users)
      }
    },
    async asyncData ({app}){
      const {data} = await app.$http.get('/attendance/lastUpdated')
      if (data.attendance != null) {
        return {
          attendance: {
            startedAt: moment(data.attendance.started_at).format('HH:mm'),
            restStartedAt: '--:--',
            restEndedAt: '--:--',
            endedAt: data.attendance.ended_at ? moment(data.attendance.ended_at).format('HH:mm') : '--:--',
          },
          active: data.attendance.ended_at ? 3 : 1 //休憩実装したら変える
        }
      }
    },
    mounted(){
      this.$client.emit('users', this.$store.state.users)
    },
    data () {
      return {
        active: 0,
        form: {
          name: '',
        },
        startFormVisible: false,
        endFormVisible: false,
        attendance: {
          startedAt: '--:--',
          restStartedAt: '--:--',
          restEndedAt: '--:--',
          endedAt: '--:--',
        }
      }
    },
    methods: {
      async start () {
        this.reset()
        this.active = 1
        this.startFormVisible = false
        const {data} = await this.$http.post('/attendance/start')
        this.attendance.startedAt = moment(data.attendance.started_at).format('HH:mm')
        this.$client.emit(this.$store.state.me.id, "出勤中")
      },
      rest () {
        this.active = 2
      },
      async stop () {
        this.active = 3
        this.endFormVisible = false
        const {data} = await this.$http.post('/attendance/end')
        this.attendance.endedAt = moment(data.attendance.ended_at).format('HH:mm')
      },
      reset (){
        this.active = 0
        this.attendance = {
          startedAt: '--:--',
          restStartedAt: '--:--',
          restEndedAt: '--:--',
          endedAt: '--:--',
        }
      }
    }
  }
</script>

<style scoped>
  .el-steps {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30px;
  }

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
    color: #8a8a8a;
    font-size: 20px;
  }

  .contents .break_time {
    padding: 30px;
    letter-spacing: 2px;
    font-weight: 300;
    color: #8a8a8a;
    font-size: 20px;
  }

  .contents .end_time {
    padding: 30px;
    letter-spacing: 2px;
    font-weight: 300;
    color: #8a8a8a;
    font-size: 20px;
  }

  .contents .attendance-btn {
    margin: 0 auto;
    margin-bottom: 30px;
    padding: 30px 100px;
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
  }

  .contents .attendance-btn:hover {
    box-shadow: 0 6px 12px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  }

  .contents .attendance-btn:last-child {
    margin-bottom: 0;
  }

  .contents .attendance-btn span {
    color: #8a8a8a;
  }
</style>
