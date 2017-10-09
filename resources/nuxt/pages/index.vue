<template>
  <div>
    <div class="column-2" v-for="user in users" :key="user.id">
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
      if (!store.state.users.length) {
        const { data } = await app.$http.get('/user')
        store.commit('SET_USERS', data.users)
      }
    }
  }
</script>

<style scoped>
  .column-2 {
    width: 49%;
    display: inline-block;
  }
  .column-2:nth-child(2n) {
    margin-left: 2%;
  }
</style>

