// 导入vue
import Vue from 'vue'
// 导入app
import App from './App.vue'
// 导入路由
import router from './router'
// 导入vuex
import store from './store'
// 导入vant,以及图片懒加载
import vant, { Lazyload } from 'vant'
// 导入vant的样式
import 'vant/lib/index.css'
// 导入css
import './style/index.css'
// 导入时间过滤器
import './filter/myfilter'
// 导入插件 login
import Myplugin from './utils/myplugin'
// 导入移动端适配
import 'amfe-flexible/index.js'
// 使用vant
Vue.use(vant)
// 使用图片懒加载
Vue.use(Lazyload)
// 使用插件
Vue.use(Myplugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
