<template>
  <div class="news">
    <h1>{{news.title}}</h1>
    <hr>
    <span>{{news.updated_at}}</span>
  </div>
</template>

<script>
  export default {
    props:['news']
  }
</script>

<style scoped>
  .news {
    border: 1px solid #ccc;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    margin-bottom: 30px;
    transition: .3s ease;
    padding: 15px 25px;
  }
  .news:hover {
    box-shadow: 0 6px 12px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  }
  .news hr {
    border:0;
    border-bottom: 2px solid #e4e4e4;
  }
  .news h1 {
    font-size: 25px;
    color: #8a8a8a;
    letter-spacing: 1.5px;
    padding: 8px 0 15px;
  }
  .news p {
    padding: 10px 0;
    color: #8a8a8a;
  }
  .news span {
    color: #8a8a8a;
    display: block;
    text-align: right;
  }
</style>

