<template>
  <div>
    <div class="log">
      <div class="from">
        <h1 class="title">更新前</h1>
        <div class="items" v-if="from">
          <log-card title="出勤日時" :body="formatTime(from.started_at)"></log-card>
          <log-card title="退勤日時" :body="formatTime(from.ended_at)"></log-card>
        </div>
      </div>
      <div class="to">
        <h1 class="title">更新後</h1>
        <p v-if="isEmptyTo()" class="empty">このレコードは削除されました</p>
        <div class="items" v-else>
          <log-card title="出勤日時" :body="formatTime(to.started_at)"></log-card>
          <log-card title="退勤日時" :body="formatTime(to.ended_at)"></log-card>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import LogCard from '~/components/LogCard'
  export default{
    components:{
      LogCard
    },
    props: ['log'],
    computed:{
      from(){
        return JSON.parse(this.log.from)
      },
      to(){
        return JSON.parse(this.log.to)
      }
    },
    methods:{
      formatTime(str){
        return moment(str).format('YYYY年MM月DD日 HH時MM分SS秒')
      },
      isEmptyTo(){
        return JSON.stringify(this.to) === "{}"
      }
    }
  }
</script>

<style scoped>
  .log{
    display: flex;
  }
  .from{
    width:49.5%;
    word-break: break-all;
  }
  .to{
    margin-left:1%;
    width:49.5%;
    word-break: break-all;
  }
  .title{
    border-radius: 2px;
    background-color: #fff;
    padding: 15px 25px 15px 20px;
    position: relative;
    border-bottom:solid 1px #f5f5f5;
    margin-bottom:10px;
  }
  .empty{
    background:#fff;
    padding:15px;
  }

</style>