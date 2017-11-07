<template>
  <div class="news">
    <h1>{{title}}</h1>
    <hr>
    <span>{{createdAt}}</span>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    props: ['news'],
    computed: {
      createdAt () {
        return moment(this.news.created_at).format('YYYY年MM月DD日 HH時mm分')
      },
      title () {
        return this.news.title
      }
    }
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
    padding: 15px 25px 15px 40px;
    position: relative;
  }
  .news:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 15px;
    height: 100%;
    background-color: #ccc;
    border-radius: 1px 0 0 0;
  }
  .news:hover {
    box-shadow: 0 6px 12px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  }
  .news hr {
    border:0;
    border-bottom: 2px solid #f5f5f5;
  }
  .news h1 {
    font-size: 19px;
    color: #8a8a8a;
    line-height: 1.5;
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
    padding: 10px 0 5px;
  }
</style>

