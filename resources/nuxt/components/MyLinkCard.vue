<template>
  <section class="link">
    <nuxt-link :to="link.href">
      <h1>{{link.name}}</h1>
    </nuxt-link>
  </section>
</template>

<script>
export default {
  props: ['link']
}
</script>


<style scoped>
  .link {
    border: 1px solid #ccc;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    transition: .3s ease;
  }
  .link:hover {
    box-shadow: 0 6px 12px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  }
  .link a {
    display: block;
    padding: 25px;
    position: relative;
  }
  .link a:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 15px;
    height: 100%;
    background-color: #cccccc;
    border-radius: 1px 0 0 0;
  }
  .link h1 {
    font-size: 20px;
    color: #8a8a8a;
    letter-spacing: 1.5px;
    padding: 15px 20px 17px;
    position: relative;
  }

</style>
