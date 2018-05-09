<template>
  <div id="products" class="container">
    <div class="row">
      <vue-product
        v-for="(product, i) in products"
        @delete-product="deleteProduct(product)"
        :product="product"
        :key="i"
      ></vue-product>
    </div>
  </div>
</template>
<script>
  import VueProduct from '../product/Product.vue'
  export default {
    name: 'products',
    data() {
      return {
        products: []
      }
    },
    components:{
      VueProduct
    },
    created() {
      //  get products
      this.$http.get('api/products')
        .then(response => {
          this.products = response.data;
        });
    },
//    methods: {
//      ...mapActions([
//        'addNewMarker',
//      ])
//    }
    methods: {
      deleteProduct(product) {
        this.$swal({
          title: 'Are you sure?',
          text: 'You will not be able to recover this product!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
        }).then((result) => {
          if (result.value) {
            this.$http.delete('api/products/' + product.id)
              .then(response => {
                let index = this.products.indexOf(product)
//                console.log(response)
                this.products.splice(index, 1);
                this.$swal(
                  'Deleted!',
                  'Your Product has been deleted.',
                  'success'
                )
              })
              .catch(() => {
                this.$swal(
                  'Something went wrong!',
                  'Please try later',
                  'error'
                )
              });
          }
        })
      }
    }
  }
</script>
<style>
</style>
