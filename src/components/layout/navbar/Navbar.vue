<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/list">ToGo List</router-link>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link" @click.prevent="logout()">Log out</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'navbar',
    created: function() {
      this.$http.get('api/user')
        .then(response => this.setAuthenticatedUser(response.body))
        .catch(err => console.log('er', err))
    },
    methods: {
      ...mapActions([
        'setAuthenticatedUser'
      ]),
      logout() {
        this.$auth.destroyToken();
        this.$router.go('/auth/login');
      }
    }
  }
</script>

<style>
</style>
