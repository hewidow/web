import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/web',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/web/brandList',
    component: () => import('../views/experiment2/BrandList.vue')
  },
  {
    path: '/web/chinaEpidemic',
    component: () => import('../views/experiment3/ChinaEpidemic.vue')
  },
  {
    path: '/web/epidemic',
    component: () => import('../views/experiment3/EpidemicNav.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/experiment3/ChinaEpidemic.vue')
      },
      {
        path: '/web/epidemic/world',
        component: () => import('../views/experiment3/WorldEpidemic.vue')
      }
    ]
  },
  {
    path: '/web/photo',
    component: () => import('../views/experiment4/Photo.vue')
  },
  {
    path: '/web/reversi',
    component: () => import('../views/work3/Reversi.vue')
  },
  {
    path: '/web/music',
    component: () => import('../views/experiment5/Music.vue')
  },
  {
    path: '/web/elm',
    component: () => import('../views/experiment6/Home.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
