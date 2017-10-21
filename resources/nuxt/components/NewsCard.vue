<template>
  <div class="news">
    <nuxt-link :to="`/management/news/${news.id}`" v-if="type === 'management'">
      <div>
        <h1>{{news.title}}</h1>
        <hr>
        <!--<span>{{news.updated_at}}</span>-->
      </div>
    </nuxt-link>
    <nuxt-link :to="`/news/${news.id}`" v-else>
      <div>
        <h1>{{news.title}}</h1>
        <hr>
        <!--<span>{{news.updated_at}}</span>-->
      </div>
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    props:['news','type']
  }
</script>

<style scoped>
  .news {
    border: 1px solid #d1dbe5;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    margin-bottom: 30px;
    -webkit-transition: ease .3s;
    -moz-transition: ease .3s;
    transition: ease .3s;
  }
  .news:hover {
    box-shadow: 0 6px 12px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  }
  .news hr {
    border:0;
    border-bottom: 2px solid #e4e4e4;
  }
  .news a {
    display: block;
    padding: 15px 25px;
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

