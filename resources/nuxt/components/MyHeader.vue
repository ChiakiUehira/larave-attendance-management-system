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
    background-color: #eeeeee;
    width: 100%;
    position: relative;
  }
  header .inner {
    padding: 23px;
    height: 20px;
  }
  header h1 {
    color: #334257;
    font-size: 20px;
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

