<template>
  <div id="feed">
    <h1>Feed</h1>
    <ul>
      <li v-for="product in products">
        {{product.name}} | {{product.price}}
      </li>
    </ul>
  </div>
</template>
<script>

  export default {
    name: 'feed',
    data() {
      return {
        products: []
      }
    },
    created() {
      //  get products
      this.$http.get('api/products')
        .then(response => {
          this.products = response.data;
        });
    },
    methods: {
//      ...mapActions([
//        'addNewMarker',
//      ])
    }
  }
</script>
<style>
</style>
