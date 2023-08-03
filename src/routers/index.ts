import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import {useTitle} from "@vueuse/core";
import {createDiscreteApi} from 'naive-ui'

const {loadingBar} = createDiscreteApi(['loadingBar'])

let routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
    meta: {
      title: '花树首页~'
    },
    component: () => import('@/views/index.vue')
  }, {
    path: '/auth/:type',
    name: 'Auth',
    meta: {
      title: '身份识别~'
    },
    component: () => import('@/views/auth/index.vue')
  }, {
    path: '/error',
    name: 'Error',
    meta: {
      title: '出错啦~请求资源未找到'
    },
    component: () => import('@/views/error/index.vue')
  }, {
    path: "/:pathMatch(.*)",
    redirect: "/error",
  },
]

// 路由
const router = createRouter({
  history: createWebHistory(),
  routes
})

/**
 * 路由前置钩子
 */
router.beforeEach((to, from, next) => {
  const metaTitle = to.meta.title;
  if (metaTitle) {
    const title = useTitle();
    title.value = metaTitle;
  }
  loadingBar.start()
  next();
})

/**
 * 路由后置钩子
 */
router.afterEach((to, from, failure) => {
  if (failure || to.path == "/error") {
    loadingBar.error()
    return;
  }
  loadingBar.finish()
})


// 导出
export default router