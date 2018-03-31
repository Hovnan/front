<template>
  <div id="app">
    <vue-navbar></vue-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
  import VueNavbar from './components/Navbar'
  import VueLogin from './components/authentication/Login'
  import VueRegister from './components/authentication/Register'
  export default {
    name: 'app',
    components: {
      VueNavbar,
      VueLogin,
      VueRegister
    },
    data () {
      return {}
    }
  }
</script>

<style lang="scss">
  @import "./sass/main";
</style>
