<template>
  <div class="page">
    <div class="column-3" v-for="user in users" :key="user.id">
      <user-card :user="user" />
    </div>
  </div>
</template>

<script>
  import UserCard from '@/components/UserCard.vue'
  export default {
    components: {
      UserCard
    },
    computed: {
      users () {
        return this.$store.state.users
      }
    },
    async fetch({app,store}){
      if (!store.state.users) {
        const { data } = await app.$http.get('/user')
        store.commit('SET_USERS', data.users)
      }
    }
  }
</script>

<style scoped>
  .page {
    padding: 30px;
    background-color: #fff;
    border-radius: 5px;
  }
  .column-3 {
    width: 32%;
    display: inline-block;
  }
  .column-3:not(:nth-child(3n)) {
    margin-right: 2%;
  }
</style>

