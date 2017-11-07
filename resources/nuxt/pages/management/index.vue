<template>
  <section>
    <contents-name >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>マネジメント</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
    <div class="page">
      <div class="contents">
        <div class="management">
          <div class="management-item" v-for="link in links" :key="link.id">
            <my-link-card :link="link" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import ContentsName from '@/components/ContentsName.vue'
import MyLinkCard from '@/components/MyLinkCard.vue'
export default {
  components: {
    MyLinkCard,
    ContentsName
  },
  computed: {
    links () {
      return [
        {
          name: 'ユーザ管理',
          href: '/management/user'
        },
        {
          name: 'ニュース管理',
          href: '/management/news'
        },
        {
          name: '企業管理',
          href: '/management/company'
        },
        {
          name: '打刻管理',
          href: '/management/clockin'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .page {
    border-radius: 2px;
  }
  .management {
    background: #fff;
    padding: 30px;
    padding-bottom: 5px;
  }
  .management-item {
      width: 49%;
      display: inline-block;
      margin-bottom: 25px;
  }
  .management-item:nth-child(2n) {
      margin-left: 2%;
  }
</style>
