<template>
  <section>
    <div class="timestamp">
      <div>
        <i class="el-icon-time"/>
        {{timestamp}}
      </div>
    </div>
  </section>
</template>

<script>
  const FORMAT = 'YYYY年MM月DD日 HH:mm:ss'
  import moment from 'moment'
  export default {
    name: 'timestamp',
    data() {
      return {
        timestamp :null
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
    }
  }
</script>

<style scoped>
  .timestamp {
    font-size: 20px;
    color: #344258;
    display: table;
    height: 100%;
  }
  .timestamp div {
    display: table-cell;
    vertical-align: middle;
    padding: 0 10px;
  }
</style>
