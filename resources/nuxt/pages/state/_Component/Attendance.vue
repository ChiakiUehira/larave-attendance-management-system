<template>
  <div>
      <div class="page">
          <div class="contents">
              <el-card class="time-elm">
                  <div class="start_time"><strong class="el-icon-time">出勤：10:00:00</strong></div>
                  <div class="break_time"><strong class="el-icon-time">休憩：12:00:00 ~ 13:00:00</strong></div>
                  <div class="end_time"><strong class="el-icon-time">退勤：--:--:--</strong></div>
              </el-card>
          </div>
          <el-card class="contents">
              <div class="attendance-btn" @click="start"><span>出勤</span></div>
              <div class="attendance-btn"><span>休憩</span></div>
              <div class="attendance-btn"><span>退勤</span></div>
          </el-card>
      </div>
  </div>
</template>

<script>
    export default{
      methods:{
        start(){

        }
      }
    }
</script>
<style scoped>
    .page{
        background-color:#fff;
        padding:40px;
    }
    .contents{
        margin:0 auto;
        text-align: center;
        width:49%;
        border-radius: 3px;
        display: inline-block;
        vertical-align: middle;
    }
    .contents:last-child{
        margin-left:2%;
    }
    .contents .start_time{
        padding:30px;
        letter-spacing: 2px;
        font-weight: 300;
        color:#8a8a8a;
        font-size:20px;
        border-top:solid 1px;
    }
    .contents .break_time{
        padding:30px;
        letter-spacing: 2px;
        font-weight: 300;
        color: #8a8a8a;
        font-size:20px;
    }
    .contents .end_time{
        padding:30px;
        letter-spacing: 2px;
        font-weight: 300;
        color: #8a8a8a;
        font-size:20px;
        border-bottom:solid 1px;
    }
    .contents .attendance-btn{
        margin:0 auto;
        margin-bottom:30px;
        padding:15px 100px;
        background: #334257;
        color:#fff;
        border-radius: 3px;
        letter-spacing: 2px;
        box-sizing: border-box;
        width:70%;
        transition: ease .3s;
        box-shadow: 3px 3px 3px black;
        cursor: pointer;
    }
    .contents .attendance-btn:hover{
      transform: rotate(1deg);
    }
    .contents .attendance-btn:last-child{
        margin-bottom:0;
    }
    .contents .attendance-btn span{
        min-width:80px;
        max-width:80px;
        padding:20px;
        margin:0 auto;
        display: block;
        background: #2E3B4C;
        border-radius: 100%;
        box-sizing: border-box;
    }
</style>