<template>
  <div>
    <div class="log">
      <div class="from">
        <h1 class="title">更新前</h1>
        <div class="items">
          <log-card title="名前" :body="`${from.last_name} ${from.first_name}`"></log-card>
          <log-card title="名前（かな）" :body="`${from.last_name_kana} ${from.first_name_kana}`"></log-card>
          <log-card title="性別" :body="from.gender"></log-card>
          <log-card title="電話番号" :body="from.tel"></log-card>
          <log-card title="Eメール" :body="from.email"></log-card>
          <log-card title="役職" :body="from.position"></log-card>
          <log-card title="住所" :body="from.address"></log-card>
          <log-card title="郵便番号" :body="from.postal_code"></log-card>
          <log-card title="管理者権限" body="あり" v-if="isManager(from.manager_flag)"></log-card>
          <log-card title="管理者権限" body="なし" v-else></log-card>
          <!--<log-card title="サムネイル" :body="from.thumbnail"></log-card>-->
        </div>
      </div>
      <div class="to">
        <h1 class="title">更新後</h1>
        <div class="items">
          <log-card title="名前" :body="`${to.last_name} ${to.first_name}`"></log-card>
          <log-card title="名前（かな）" :body="`${to.last_name_kana} ${to.first_name_kana}`"></log-card>
          <log-card title="性別" :body="to.gender"></log-card>
          <log-card title="電話番号" :body="to.tel"></log-card>
          <log-card title="Eメール" :body="to.email"></log-card>
          <log-card title="役職" :body="to.position"></log-card>
          <log-card title="住所" :body="to.address"></log-card>
          <log-card title="郵便番号" :body="to.postal_code"></log-card>
          <log-card title="管理者権限" body="あり" v-if="isManager(to.manager_flag)"></log-card>
          <log-card title="管理者権限" body="なし" v-else></log-card>
          <!--<log-card title="サムネイル" :body="to.thumbnail"></log-card>-->
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
    },
    methods:{
      isManager(flag){
        return flag === 'manager'
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