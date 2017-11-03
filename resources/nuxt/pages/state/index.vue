<template>
    <div>
        <contents-name>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>ステート</el-breadcrumb-item>
            </el-breadcrumb>
        </contents-name>
        <div class="page">
            <el-steps :active="active" finish-status="success" simple>
                <el-step title="出勤" icon="el-icon-edit-outline"></el-step>
                <el-step title="休憩" icon="el-icon-more"></el-step>
                <el-step title="退勤" icon="el-icon-time"></el-step>
            </el-steps>
            <div class="attendance">
                <el-card class="contents">
                    <div class="time-elm">
                        <div class="start_time"><strong class="el-icon-time">出勤：10:00:00</strong></div>
                        <div class="break_time"><strong class="el-icon-time">休憩：12:00:00 ~ 13:00:00</strong></div>
                        <div class="end_time"><strong class="el-icon-time">退勤：--:--:--</strong></div>
                    </div>
                </el-card>
                <div class="contents">
                    <div class="attendance-btn" @click="open"><span>出勤</span></div>
                    <div class="attendance-btn" @click="rest"><span>休憩</span></div>
                    <div class="attendance-btn" @click="stop"><span>退勤</span></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import ContentsName from '@/components/ContentsName.vue'
  export default {
    components: {
      ContentsName,
    },
    async fetch ({app, store}) {
      if (!store.state.me) {
        const {data} = await app.$http.get('/me')
        store.commit('SET_ME', data.me)
      }
    },
    data(){
      return {
        active: 0
      }
    },
    methods: {
      open() {
        this.$prompt('今日の意気込み!', '出勤する', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
        }).then(value => {
          this.start()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Input canceled'
          });
        })
      },
      start(){
        this.active = 1
      },
      rest(){
        this.active = 2
      },
      stop(){
        this.active = 3
      }
    }
  }
</script>

<style scoped>
    .el-steps {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 50px;
    }
    .el-card{
        padding:40px 20px;
    }

    .page {
        background-color: #fff;
        padding: 40px;
    }
    .attendance{
        margin:0 auto;
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
