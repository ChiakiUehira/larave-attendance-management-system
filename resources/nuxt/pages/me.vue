<template>
  <div>
    <contents-name name="プロフィール" />
    <div class="page">
      <div class="contents">
        <div class="image">
          <img :src="me.thumbnail" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ContentsName from '@/components/ContentsName.vue'
export default {
  components: {
    ContentsName
  },
  computed: {
    me () {
      return this.$store.state.me
    }
  },
  async fetch ({app, store}) {
    if (!store.state.me) {
      const { data } = await app.$http.get('/me')
      store.commit('SET_ME', data.me)
    }
  }
}
</script>

<style scoped>
  .page {
    background-color: #fff;
    border-radius: 2px;
  }
</style>
