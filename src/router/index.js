import { createRouter, createWebHistory } from 'vue-router'
import sourceData from '@/data.json'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home')
  },
  {
    path: '/me',
    name: 'Profile',
    component: () => import('../pages/Profile'),
    meta: { toTop: true, smoothScroll: true }
  },
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    component: () => import('../pages/Profile'),
    props: { edit: true }
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: () => import('../pages/Category.vue'),
    props: true
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    component: () => import('../pages/Forum'),
    props: true
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: () => import('../pages/ThreadShow'),
    props: true,
    beforeEnter (to, from, next) {
      const threadExists = sourceData.threads.find(thread => thread.id === to.params.id)
      if (threadExists) {
        return next()
      } else {
        next({
          name: 'NotFound',
          params: { pathMatch: to.path.substring(1).split('/') },
          query: to.query,
          hash: to.hash
        })
      }
    }
  },
  {
    path: '/form/:forumId/thread/create',
    name: 'ThreadCreate',
    component: () => import('../pages/ThreadCreate'),
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/NotFound')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to) {
    const scroll = {}
    if (to.meta.toTop) scroll.top = 0
    if (to.meta.smoothScroll) scroll.behavior = 'smooth'
    return scroll
  }
})

export default router
