import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { path: '/home' },
      name: 'empty'
    },
    {
      path: '/home',
      name: 'HelloWorld',
      component: Home
    },
    {
      path: '/login',
      name: 'HelloWorld',
      component: Login
    },
    {
      path: '/account/:id',
      name: 'account',
      component: Home
    },
    {
      path: '/*',
      name: 'default',
      redirect: { path: '/home' }
    }
  ]
})
