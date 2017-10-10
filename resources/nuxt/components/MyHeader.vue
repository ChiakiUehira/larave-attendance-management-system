<template>
  <div>
    <header>
      <div class="inner">
        <h1>{{company.company_name}}</h1>
      </div>
      <div class="timestamp">
        <i class="el-icon-time"/>
        {{timestamp}}
      </div>
      <log-out class="logout-elm"/>
    </header>
  </div>
</template>

<script>
const FORMAT = 'YYYY年MM月DD日 HH:mm:ss'
import LogOut from '~/components/Logout.vue'
import moment from 'moment'
export default {
  data() {
    return {
      timestamp :null
    }
  },
  components: {
    LogOut,
  },
  computed:{
    company () {
      return this.$store.state.company
    }
  },
  methods: {
    updateTime () {
      this.timestamp = moment().format(FORMAT)
    }
  },
  created () {
    this.timestamp = moment().format(FORMAT)
    setInterval(() => this.updateTime(), 1 * 100);
  },
  async fetch () {

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
  header .timestamp {
    position: absolute;
    top: 50%;
    right: 150px;
    transform: translateY(-50%);
    font-size: 20px;
    color: #344258;
  }
  .logout-elm {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>

