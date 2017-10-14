<template>
  <div>
    <div class="loadingArea" v-loading="isLoading" element-loading-text="Loading...">
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style scoped>
  .loadingArea {
    height: calc(100vh - 56px);
  }
</style>

