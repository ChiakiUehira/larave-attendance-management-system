<template>
  <section>
    <div class="logout" @click="logout">
      <icon name="sign-out" scale="2"></icon>
    </div>
  </section>
</template>

<script>
  import { remove } from '../../../utils/Token'
  export default {
    name: 'logout',
    methods: {
      logout () {
        remove()
        window.location.reload()
      }
    }
  }
</script>

<style scoped>
  .logout {
    padding: 11px 20px 11px 25px;
    background-color: #419dff;
    color: #fff;
    cursor: pointer;
  }
  .logout:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
</style>
