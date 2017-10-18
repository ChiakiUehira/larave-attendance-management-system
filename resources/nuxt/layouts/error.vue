<template>
  <section class="container">
    <div class="inner">
      <div class="contents">
        <h1 class="title">
          {{ error.statusCode }}
        </h1>
        <h2 class="info">
          {{ error.message }}
        </h2>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: ['error']
}
</script>

<style scoped>
.container {
  background: #f9f9f9;
  width: 100vw;
  height: 100vh;
  display: table;
}
.container .inner {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.container .contents {
  background: #324157;
  max-width: 800px;
  width: 100%;
  display: inline-block;
  padding: 30px;
  color: #fff;
}
.container .title {
  font-size: 2rem;
  margin-bottom: 30px;
}
</style>
