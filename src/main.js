import Vue from 'vue'
import App from './App.vue'

import router from './router'
import resource from 'vue-resource'

Vue.use(resource)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
