import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signin from '../views/Signin.vue'
import Signup from '../views/Signup.vue'
import Logging from '../views/Logging.vue'
import Logout from '../views/Logout.vue'

Vue.use(VueRouter)

const auth = (to, from, next) => {
  if(!localStorage.getItem('apiUser')) {
    next({ name: 'Signin' })
  }
  next()
}

const guest = (to, from, next) => {
  if(localStorage.getItem('apiUser')) {
    next({ name: 'Logging' })
  }
  next()
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/logging',
    name: 'Logging',
    component: Logging,
    beforeEnter: auth
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin,
    beforeEnter: guest
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: guest
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    beforeEnter: auth
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
