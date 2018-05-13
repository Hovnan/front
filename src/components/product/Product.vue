<template>
  <div class="col-md-4">
    <div class="card mb-4 box-shadow">
      <img class="card-img-top" alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;" :src="'http://localhost:8000/images/'+product.image" data-holder-rendered="true">

      <!--<img class="card-img-top" style="height: 225px; width: 100%; display: block;" src="https://www.behance.net/gallery/11889067/Flat-avatars-icons" alt="">-->
      <div class="card-body">
        <p class="card-text">{{product.name}}<a href="#" class="btn btn-danger float-right" role="button" @click.prevent="$emit('delete-product')">x</a></p>

        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-outline-secondary">Wish List</button>
            <button type="button" class="btn btn-sm btn-outline-secondary">Buy</button>
          </div>
          <small class="text-muted">{{product.price}}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'product',
    props: ['product']
  }
</script>
