<template>
  <div class="name">
    <slot>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'contents-name',
  data () {
    return {
    }
  }
}
</script>


<style scoped>
  .name {
    padding: 20px 25px;
    background-color: #fff;
    margin-bottom: 10px;
    border-radius: 2px;
  }
  .name h1 {
    color: #777777;
    font-weight: bold;
    font-size: 17px;
  }
</style>
