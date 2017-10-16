<template>
  <div>
    <div class="loadingArea" v-loading="isLoading" v-if="isLoading" element-loading-text="Loading...">
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
    position: fixed;
    top: calc(0px + 56px);
    right: 0;
    width: calc(100% - 220px);
    z-index: 11111;
  }
</style>

