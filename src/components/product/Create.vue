<template>
  <div id="create" class="row">
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
          <button class="btn btn-success" @click="create()">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        product: {
          name: '',
          price: 0,
          description: '',
        }
      }
    },
    methods: {
      create() {
        this.$http.post('api/products', this.product)
          .then(response => {
            this.$router.push('/feed');
          })
      }
    }
  }
</script>
