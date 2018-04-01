import Vue from 'vue'
import App from './App.vue'

import router from './router'
import resource from 'vue-resource'

import Auth from './packages/auth/Auth.js'

Vue.use(resource)
Vue.use(Auth)

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.forVisitors)){
    if(Vue.auth.isAuthenticated()) {
      next({
        path:'/feed'
      })
    } else {
      next()
    }
  }
  else if(to.matched.some(record => record.meta.forAuth)){
    if(! Vue.auth.isAuthenticated()) {
      next({
        path:'/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
