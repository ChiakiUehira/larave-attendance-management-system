<template>
  <div>
    <div class="log">
      <div class="from">
        <h1 class="title">更新前</h1>
        <div class="items">
          <log-card title="名前" :body="from.name"></log-card>
          <log-card title="詳細" :body="from.detail"></log-card>
        </div>
      </div>
      <div class="to">
        <h1 class="title">更新後</h1>
        <div class="items">
          <log-card title="名前" :body="to.name"></log-card>
          <log-card title="詳細" :body="to.detail"></log-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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

</style>