<template>
  <div class="row">
    <div>{{data.label}}</div>
    <div>{{data.value}}</div>
  </div>
</template>

<script>
  export default {
    props: ['data'],
  }
</script>


<style>
  .row {
    background: #fff;
    letter-spacing: 1px;
  }

  .row:not(:last-child) {
    margin-bottom: 10px;
  }

  .row div {
    padding: 10px;
  }

  .row div:first-child {
    font-size: 12px;
    background: #efefef;
  }

  .row div:last-child {
    padding: 15px 10px;
  }
</style>
