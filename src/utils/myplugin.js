// 封装vue 的插件,用来判断用户是否登录
// 导入vue
import Vue from 'vue'
import store from '../store/index'
import { Toast } from 'vant'
import router from '../router/index'
// 使用提示
Vue.use(Toast)

// 创建一个对象
const pluginObj = {}
// 添加一个install 的方法
pluginObj.install = function (Vue) {
  // 给Vue添加全局方法
  Vue.prototype.$login = function () {
    // 得到用户的token
    const token = store.state.userInfo.token
    if (token) {
      return true
    } else {
      // 提示
      Toast.fail('对不起,你没有登录,请登录')
      // 跳转
      router.push('/checkLogin')
      return false
    }
  }
}

// 导出
export default pluginObj
