<template>
  <article class="article">
    <nuxt-link :to="`/article/${article.id}`">
      <div>
        <h1>{{article.title}}</h1>
        <hr>
        <p>{{article.content}}</p>
        <span>{{article.updated_at}}</span>
      </div>
    </nuxt-link>
  </article>
</template>

<script>
  export default {
    props:['article']
  }
</script>

<style scoped>
  .article {
    border: 1px solid #d1dbe5;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    margin-bottom: 30px;
    -webkit-transition: ease .3s;
    -moz-transition: ease .3s;
    transition: ease .3s;
  }
  .article:hover {
    box-shadow: 0 6px 12px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  }
  .article hr {
    border:0;
    border-bottom: 2px solid #e4e4e4;
  }
  .article a {
    display: block;
    padding: 15px 25px;
  }
  .article h1 {
    font-size: 25px;
    color: #8a8a8a;
    letter-spacing: 1.5px;
    padding: 8px 0 15px;
  }
  .article p {
    padding: 10px 0;
    color: #8a8a8a;
  }
  .article span {
    color: #8a8a8a;
    display: block;
    text-align: right;
  }
</style>

