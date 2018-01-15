<template>
    <section>
        <contents-name name="ニュース編集">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/management' }">マネジメント</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/management/news' }">ニュース一覧</el-breadcrumb-item>
                <el-breadcrumb-item>投稿</el-breadcrumb-item>
            </el-breadcrumb>
        </contents-name>
        <news-form :news="news"></news-form>
    </section>
</template>

<script>
  import NewsForm from '~/components/NewsForm'
  import ContentsName from '~/components/ContentsName'
  export default{
    asyncData () {
      return {
        news: {
          title: '',
          detail: ''
        }
      }
    },
    components: {
      NewsForm,
      ContentsName
    }
  }
</script>