<template>
  <section class="container">
    <my-article v-for="article in articles" :article="article" :key="article.id"/>
  </section>
</template>

<script>
  import MyArticle from '~/components/Article.vue'
  export default {
    components:{
      MyArticle
    },
    computed:{
      articles(){
        return this.$store.state.articles
      }
    },
    async fetch ({app, store, params}) {
      if (!store.state.articles) {
        const { data } = await app.$http.get('/article')
        store.commit('setArticles', data.articles)
      }
    }
  }
</script>
