<template>
  <div id="update" class="row">
    <div class="col-md-4 offset-md-4">
      <div class="panel panel-default">
        <div class="panel-body">
          <div class="form-group">
            <label for="name">Name</label>
            <input id="name" class="form-control" type="text" v-model="product.name">
          </div>
          <div class="form-group">
            <label for="price">Price</label>
            <input id="price" class="form-control" type="number" v-model="product.price">
          </div>
          <div class="form-group">
            <label for="desc">Description</label>
            <textarea id="desc" class="form-control" cols="30" rows="10" v-model="product.description"></textarea>
          </div>
          <button class="btn btn-success" @click="edit()">Edit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        product: {}
      }
    },
    created() {
      this.getProduct();
    },
    methods: {
      getProduct() {
        this.$http.get('api/products/' + this.$route.params.product)
          .then(response => {
            this.product = response.data;
          })
          .catch(response => {
//            console.log('error', response);
//            let status = ;
            this.$swal(
              response.status.toString(),
              response.data.error,
              'error'
            )
          });
      },
      edit() {
        this.$http.put('api/products/' + this.$route.params.product, this.product)
          .then(response => {
//            this.$swal(
//              'Updated!',
//              'Your Product has been updated.',
//              'success'
//            )
            this.$router.push('/feed');
          })
      }
    }
  }
</script>
