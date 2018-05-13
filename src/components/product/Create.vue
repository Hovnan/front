<template>
  <div id="create" class="row">
    <div class="col-md-4 offset-md-4">
      <div class="panel panel-default">
        <div class="panel-body">
          <form @submit.prevent="create">
            <div class="form-group">
              <!--<label for="image">Image</label>-->
              <input
                id="image"
                type="file"
                class="form-control"
                @change="imageChanged"
              >
            </div>
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                class="form-control"
                v-model="product.name"
                v-validate="'required'"
                :class="{'is-invalid': errors.has('name')}"
              >
              <span v-show="errors.has('name')" class="invalid-feedback">{{ errors.first('name') }}</span>
            </div>
            <div class="form-group">
              <label for="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                class="form-control"
                v-model="product.price"
                v-validate="'max_value:50|min_value:3'"
                :class="{'is-invalid': errors.has('price')}"
              >
              <span v-show="errors.has('price')" class="invalid-feedback">{{ errors.first('price') }}</span>
            </div>
            <div class="form-group">
              <label for="desc">Description</label>
              <textarea id="desc" class="form-control" cols="30" rows="10" v-model="product.description"></textarea>
            </div>
            <input type="submit" class="btn btn-success" value="Create">
          </form>
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
          image: ''
        }
      }
    },
    methods: {
      imageChanged(e) {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);
        fileReader.onload = (e) => {
          this.product.image = e.target.result;
        }
      },
      create() {
        this.$validator.validate().then((result) => {
          if(result) {
            this.$http.post('api/products', this.product)
              .then(response => {
                this.$router.push('/feed');
              });
          }
        });

      }
    }
  }
</script>
