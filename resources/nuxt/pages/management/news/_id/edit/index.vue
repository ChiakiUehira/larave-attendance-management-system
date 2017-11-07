<template>
  <section>
    <contents-name name="ニュース編集">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/management' }">マネジメント</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/management/news' }">ニュース一覧</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/management/news/${news.id}`}">ニュース詳細</el-breadcrumb-item>
        <el-breadcrumb-item>ニュース編集</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
    <news-form type="edit" :news="news"></news-form>
  </section>
</template>
<script>
  import NewsForm from '~/components/NewsForm'
  import ContentsName from '~/components/ContentsName'
  export default{
    async asyncData ({app, params}) {
      const {data} = await app.$http.get(`/news/${params.id}`)
      return {news: data.news}
    },
    components: {
      NewsForm,
      ContentsName
    }
  }
</script>