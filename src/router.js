import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/store'
    },
    {
      path: '/ebook',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/ebook/index.vue'),
      children: [
        {
          path: ':fileName',
          component: () => import('./components/ebook/ebook-reader.vue')
        }
      ]
    },
    {
      path: '/store',
      redirect: '/store/home',
      component: () => import('./views/store/index.vue'),
      children: [
        {
          path: 'home',
          component: () => import('./views/store/store-home.vue')
        }
      ]
    }
  ]
})
