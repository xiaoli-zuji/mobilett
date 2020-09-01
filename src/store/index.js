import Vue from 'vue'
import Vuex from 'vuex'
// 导入localstrage
import { localGet } from '../utils/mylocal.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 管理状态
    userInfo: localGet('userinfo') || {}
  },
  mutations: {
    // 修改状态
    setUserInfo (state, playload) {
      state.userInfo = playload
    }
  }
})
