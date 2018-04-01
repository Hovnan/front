<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div class="panel panel-default">
        <div class="panel-body">
          <div class="form-group">
            <input type="email" class="form-control" v-model="email" placeholder="Email">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" v-model="password" placeholder="Password">
          </div>
          <button @click="login" class="btn btn-success pull-right">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods:{
      login () {
        let data = {
          client_id: 2,
          client_secret: 'mi3K0Ir8j0Ndu8f0sA3RLa9OA6fH1gVqjnT4GPzM',
          grant_type: 'password',
          username: this.email,
          password: this.password,
        }
        this.$http.post('http://localhost:8000/oauth/token', data)
          .then(response => {
            this.$auth.setToken(response.body.access_token, response.body.expires_in + Date.now())
            this.$router.push('/feed')
          })
      }
    }
  }
</script>
<style></style>
