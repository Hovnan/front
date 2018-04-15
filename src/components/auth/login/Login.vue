<template>
  <div id="login">
    <h3>Welcome Login page</h3>
    <div class="panel panel-default">
      <div class="panel-body">
        <div class="form-group">
          <input type="email" class="form-control" name="email" v-model="email" placeholder="Email" v-validate="'required|email'" :class="{'is-invalid': errors.has('email')}">
          <span v-show="errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</span>
        </div>
        <div class="form-group">
          <input type="password" class="form-control" name="password" v-model="password" placeholder="Password" v-validate="'required|min:6'" :class="{'is-invalid': errors.has('password')}">
          <span v-show="errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</span>
        </div>
          <button @click="login" class="btn btn-success pull-right" type="button">Login</button>
          <br>
          <br>
          <router-link class='link' :to="{name: 'Signup'}">Create Account</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'login',
    data () {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      ...mapGetters([
        'config',
      ]),
    },
    methods: {
      login () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            let userData = {
              client_id: this.config.client_id,
              client_secret: this.config.client_secret,
              grant_type: this.config.grant_type,
              username: this.email,
              password: this.password,
            };
            this.$http.post('oauth/token', userData)
              .then(response => {
                this.$auth.setToken(response.body.access_token, response.body.expires_in + Date.now())
                this.$router.push('/dashboard');
              })
            return;
          }
        })
      }
    }
  }
</script>

<style>
</style>
