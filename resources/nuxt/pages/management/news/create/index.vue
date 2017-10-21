<template>
    <news-form :news="news"></news-form>
</template>

<script>
  import NewsForm from '~/components/NewsForm'
  export default{
    asyncData () {
      return {
        news :{
          title: '',
          detail: ''
        }
      }
    },
    components: {
      NewsForm
    },
  }
</script>