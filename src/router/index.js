import Vue from 'vue'
import Router from 'vue-router'
import * as types from './types'
import homeRoutes from './src/home'
import clientInfoRoutes from './src/clientInfo'
import agencyOrClientRoutes from './src/agencyOrClient'
import mineRoutes from './src/mine'
import resetPassword from './src/resetPassword'
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: '/web/h5',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: types.LOGIN,
      component: resolve => require(['@/pages/login/index.vue'], resolve),
      meta: {
        isShowFooter: false,
        title: '登录'
      }
    },
    {
      path: '/register',
      name: types.REGISTER,
      component: resolve => require(['@/pages/login/register.vue'], resolve),
      meta: {
        isShowFooter: false,
        title: '注册'
      }
    },
    ...homeRoutes,
    ...mineRoutes,
    ...clientInfoRoutes,
    ...agencyOrClientRoutes,
    ...resetPassword
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.path.indexOf('client_info_') !== -1 || to.path.indexOf('clientEdit') !== -1 || to.path.indexOf('commission') !== -1) {
    // clientEdit-新增商户
    console.log('进入进件')
    return next()
  }
  if (to.path !== '/login' && to.path !== '/register') {
    // 判断是否存在token
    if (!sessionStorage.token && to.path !== '/fogot') {
      next({ path: '/login' })
    } else if (to.path === '/fogot') {
      next()
    } else {
      next()
    }
  } else {
    sessionStorage.clear()
    next()
  }
})

router.afterEach(to => {
  window.scrollTo(0, 0)
})

export default router
