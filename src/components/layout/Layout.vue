<template>
  <div>
    <navbar></navbar>
    <div class="content-wrap" id="content-wrap">
      <main id="content" class="content" role="main">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
  import Navbar from './navbar/Navbar'

  export default {
    name: 'layout',

    components: {
      Navbar,
    }
  }
</script>

<style>
</style>
