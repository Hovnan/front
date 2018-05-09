<template>
  <div class="col-md-4">
    <div class="card mb-4 box-shadow">
      <img class="card-img-top" alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;" src="data:image/png;base64,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" data-holder-rendered="true">

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
