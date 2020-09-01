import Vue from 'vue'
import VueRouter from 'vue-router'
// // 导入 useVant 组件
// import UseVant from '../views/useVant/index.vue'
// // 导入login组件
// import Login from '../views/login/index.vue'
// import Home from '../views/home/index.vue'
// import Index from '../views/index/index.vue'
// import My from '../views/my/index.vue'
// // 导入搜索组件
// import Search from '../views/search/index.vue'
// // 导入搜索结果组件
// import SearchResult from '../views/searchResult/index.vue'
// // 导入详情页面
// import detail from '../views/detail/index.vue'
// // 导入个人信息页面
// import info from '../views/info/index.vue'
// // 导入小智同学页面
// import zhi from '../views/zhi/index.vue'

// 导入 useVant 组件
const UseVant = () => import('../views/useVant/index.vue')
// 导入login组件
const Login = () => import('../views/login/index.vue')
const Home = () => import('../views/home/index.vue')
const Index = () => import('../views/index/index.vue')
const My = () => import('../views/my/index.vue')
// 导入搜索组件
const Search = () => import('../views/search/index.vue')
// 导入搜索结果组件
const SearchResult = () => import('../views/searchResult/index.vue')
// 导入详情页面
const detail = () => import('../views/detail/index.vue')
// 导入个人信息页面
const info = () => import('../views/info/index.vue')
// 导入小智同学页面
const zhi = () => import('../views/zhi/index.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/uservant',
    component: UseVant
  },
  {
    path: '/login',
    component: Login
  },
  // 添加一个判断checklogin的路由
  {
    path: '/checkLogin',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: Index
      },
      {
        path: '/my',
        component: My
      },
      {
        path: '/search',
        component: Search
      }
    ]
  },
  // 搜索结果页面
  {
    // path: '/searchResult',
    // 动态传参
    path: '/searchResult/:key',
    component: SearchResult
  },
  // 详情页面
  {
    path: '/detail/:artid',
    component: detail
  },
  // 个人信息页面
  {
    path: '/info',
    component: info
  },
  // 小智同学
  {
    path: '/zhi',
    component: zhi
  }
]

const router = new VueRouter({
  routes
})

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router
