<template>
    <div>
        <header>
            <div class="beforePage" @click="beforePage"><i class="el-icon-caret-left"></i></div>
            <div class="inner">
                <h1>{{company.company_name}}</h1>
            </div>
            <timestamp class="timestamp-elm"/>
            <log-out class="logout-elm"/>
        </header>
    </div>
</template>

<script>
  import LogOut from '~/components/Logout.vue'
  import Timestamp from '~/components/Timestamp.vue'
  export default {
    components: {
      LogOut,
      Timestamp,
    },
    computed:{
      company () {
        return this.$store.state.company
      }
    },
    methods:{
      beforePage(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
    .beforePage {
        padding: 20px 25px;
        background-color:#b2bfcd ;
        color:#1F2D3D;
        cursor: pointer;
        transition: .3s;
        position: absolute;
        top:0;
        left:0;
        display: inline;
    }

    .beforePage:hover {
        background-color: #8492A6;
    }
    header {
        background-color: #eeeeee;
        width: 100%;
        position: relative;
    }
    header .inner {
        padding: 19px;
    }
    header h1 {
        padding-left:65px;
        color: #334257;
        font-size: 18px;
        font-weight: bold;
    }
    .logout-elm {
        position: absolute;
        top: 0;
        right: 0;
    }
    .timestamp-elm {
        position: absolute;
        top: 0;
        right: 105px;
        height: 100%;
    }
</style>

