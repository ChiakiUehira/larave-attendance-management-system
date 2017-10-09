<template>
  <div>
    <ul>
      <li>{{fullName}}</li>
      <li>{{user.postal_code}}</li>
      <li>{{user.address}}</li>
      <li>{{user.email}}</li>
      <li>{{fullName}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    user () {
      const id = this.$route.params.id
      return this.$store.state.users[id - 1]
    },
    fullName () {
      return `${this.user.last_name} ${this.user.first_name}`
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

</style>
