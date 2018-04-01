import Vue from 'vue'
import VueRouter from 'vue-router'

import Feed from '../components/Feed'
import Login from '../components/authentication/Login'
import Register from '../components/authentication/Register'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login,
      meta: {
        forVisitors: true
      }
    },
    {
      path: '/register',
      component: Register,
      meta: {
        forVisitors: true
      }
    },
    {
      path: '/feed',
      component: Feed,
      meta: {
        forAuth: true
      }
    }
  ]
})

export default router
