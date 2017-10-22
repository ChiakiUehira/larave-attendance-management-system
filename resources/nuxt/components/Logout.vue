<template>
  <section>
    <div class="logout" @click="logout">
      <span>Logout</span>
    </div>
  </section>
</template>

<script>
  import { remove } from '../../../utils/Token'
  export default {
    name: 'logout',
    methods: {
      logout(){
        remove()
        window.location.reload()
      }
    }
  }
</script>

<style scoped>
  .logout {
    padding: 20px 25px;
    background-color: #334257;
    color: #b2bfcd;
    cursor: pointer;
    transition: .3s;
  }
  .logout:hover {
    background-color: #48576a;
  }
</style>
