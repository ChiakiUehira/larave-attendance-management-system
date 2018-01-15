<template>
  <div class="item">
    <p class="head">{{title}}</p>
    <p class="body">{{body}}</p>
  </div>
</template>

<script>
  export default{
    props:['title','body']
  }
</script>

<style scoped>
  .item{
    border:solid 1px #f5f5f5;
    border-radius:2px;
    margin-bottom:10px;
    display:flex;
  }
  .item .head{
    background:#efefef;
    padding:15px;
    width:30%;
  }
  .item .body{
    padding:15px;
    background: #fff;
    width:70%;
  }
</style>