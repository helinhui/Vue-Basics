import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/home'
import Userlist from '@/views/user'
import rightList from '@/views/rights'
import { getToken } from '@/utils/auth'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/', // layout显示在App.vue的router-view中
      component: Layout,
      children: [
        // 路由嵌套,显示在layout/header.vue的router-view中
        // 空路径代表访问父路由的路径
        { path: '', component: Home },
        { path: '/users', component: Userlist },
        { path: '/rights', component: rightList }

      ]
    }
  ]
})
// 守卫导航
// to去哪儿,from从哪儿来,next放行规则
router.beforeEach((to, from, next) => {
  console.log('1:路由拦截,所有路由都要通过这里校验是否有token')
  const { path } = to
  if (path !== '/login') { // 如果请求的不是 /login 则校验登陆状态
    // const token = window.localStorage.getItem('token')
    const token = getToken()

    if (!token) { // 如果没有 token 则让其跳转到 /login
      next('/login')
    } else { // 有 token，让其通过
      next()
    }
  } else {
    // 如果用户请求的就是 /login 则直接调用 next() 放行
    next()
  }
})
export default router
