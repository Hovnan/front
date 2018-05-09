<template>
  <div id="feed">
    <h1>Feed</h1>
    <vue-products></vue-products>
  </div>
</template>
<script>
  import VueProducts from '../product/Products.vue'
  export default {
    name: 'feed',
    components: {
      VueProducts
    }
  }
</script>
<style>
</style>
