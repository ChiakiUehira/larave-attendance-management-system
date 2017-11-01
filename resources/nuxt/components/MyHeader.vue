<template>
    <div>
        <header>
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
    }
  }
</script>

<style scoped>
    header {
        background-color: #fff;
        width: 100%;
        position: relative;
        border-bottom: 1px solid #e6e6e6;
    }
    header .inner {
        padding: 19px;
    }
    header h1 {
        color: #7c8085;
        font-size: 18px;
    }
    .logout-elm {
        position: absolute;
        top: 0;
        right: 0;
    }
    .timestamp-elm {
        position: absolute;
        top: 0;
        right: 75px;
        height: 100%;
    }
</style>

