import Vue from 'vue'
import App from './App.vue'

import router from './router'
import resource from 'vue-resource'

import Auth from './packages/auth/Auth.js'

import store from './store'
import VeeValidate from 'vee-validate';

import swal from './plugins/swal/swal'

Vue.use(resource)
Vue.use(Auth)

Vue.use(VeeValidate);
Vue.use(swal);

Vue.http.options.root = 'http://localhost:8000'
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', 'Bearer ' + Vue.auth.getToken())
  request.headers.set('Accept', 'application/json')
  next(response => {
    if(response.status == 404) {
      // router.push('not-found');
      this.$swal(
        response.status.toString(),
        response.data.error,
        'error'
      )
    } else if(response.status == 500) {
      router.push('server-error');
    } else if(response.status == 401 ) {
      Vue.auth.destroyToken();
      router.go('/auth/login');
    }
  })
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.forVisitors)){
    if(Vue.auth.isAuthenticated()) {
      next({
        path:'/dashboard'
      })
    } else {
      next()
    }
  }
  else if(to.matched.some(record => record.meta.forAuth)){
    if(! Vue.auth.isAuthenticated()) {
      next({
        path:'/auth/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

let app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
