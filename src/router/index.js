import Vue from 'vue'
import VueRouter from 'vue-router'
//
import Dashboard from '../components/dashboard/Dashboard'
import List from '../components/list/List'
import Login from '../components/auth/login/Login'
import Signup from '../components/auth/signup/Signup'
import ServerError from '../components/errors/server-error/ServerError'
import NotFound from '../components/errors/not-found/NotFound'
//
Vue.use(VueRouter)
//
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'Login',
      path: '/auth/login',
      component: Login,
      meta: {
        forVisitors: true
      }
    },
    {
      name: 'Signup',
      path: '/auth/signup',
      component: Signup,
      meta: {
        forVisitors: true
      }
    },
    {
      path: '/list',
      component: List,
      meta: {
        forAuth: true
      }
    },
    {
      path: '/dashboard',
      component: Dashboard,
      meta: {
        forAuth: true
      }
    },
    {
      path: '/not-found',
      component: NotFound
    },
    {
      path: '/server-error',
      component: ServerError
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

export default router

