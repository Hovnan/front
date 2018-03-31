import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/authentication/Login'
import Register from '../components/authentication/Register'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    }
  ]
})

export default router
