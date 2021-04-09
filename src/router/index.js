import Vue from 'vue'
import VueRouter from 'vue-router'
// 记得路径前面是两个点
import login from '../components/login.vue'
// 导入home页面
import home from '../components/home.vue'

Vue.use(VueRouter)

const routes = [
  { path:'/',redirect:'/login'},
  {
    path:'/login',component:login
  },
  {
    path:'/home',component:home
  }
]

const router = new VueRouter({
  routes
})

export default router
