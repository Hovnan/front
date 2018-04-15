<template>
      <div id="signup">
        <h2>Create New Account</h2>
        <div class="panel panel-default">
          <div class="panel-body">
            <div class="form-group">
              <input type="text" class="form-control" v-model="name" name="name" placeholder="Name" v-validate="'required'" :class="{'is-invalid': errors.has('name')}">
              <span v-show="errors.has('name')" class="invalid-feedback">{{ errors.first('name') }}</span>
            </div>
            <div class="form-group">
              <input type="email" class="form-control" name="email" v-model="email" placeholder="Email" v-validate="'required|email'" :class="{'is-invalid': errors.has('email')}">
              <span v-show="errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</span>
            </div>
            <div class="form-group">
              <input type="password" class="form-control" name="password" v-model="password" placeholder="Password" v-validate="'required|min:6'" :class="{'is-invalid': errors.has('password')}">
              <span v-show="errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</span>
            </div>
            <button @click="signUp" type="button" class="btn btn-success pull-right">Sign Up</button>
          </div>
        </div>
        <br>
        <br>
        <router-link class='link' :to="{name: 'Login'}">Already Joined</router-link>
      </div>
</template>

<script>
  export default {
    name: 'signup',
    data () {
      return {
        name: '',
        email: '',
        password: ''
      }
    },
    methods: {
      signUp() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            let userData = {
              name: this.name,
              email: this.email,
              password: this.password,
            };
            this.$http.post('api/register', userData)
              .then(response => {
                this.$swal(
                  'Success!',
                  response.body.message,
                  response.body.status
                )
              })
              .catch(error => {
                this.$swal(
                  'Error!',
                  error.body.join(', '),
                  'error'
                )
              })
            return;
          }
        });
      }
    }
  }
</script>

<style>
</style>
