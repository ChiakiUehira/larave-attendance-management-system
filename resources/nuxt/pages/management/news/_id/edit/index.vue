<template>
    <section>
        <news-form type="edit" :news="news"></news-form>
    </section>
</template>
<script>
  import NewsForm from '~/components/NewsForm'
  export default{
    async asyncData ({app, params}) {
      const { data } = await app.$http.get(`/news/${params.id}`)
      return {news: data.news}
    },
    components: {
      NewsForm
    }
  }
</script>