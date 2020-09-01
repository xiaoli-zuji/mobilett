// 导入vue
import Vue from 'vue'
// 导入dayjs
import dayjs from 'dayjs'
// 导入相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 导入语言包
import 'dayjs/locale/zh-cn'
// 扩展插件
dayjs.extend(relativeTime)
// 全局使用简体中文
dayjs.locale('zh-cn')

// 创建一个时间过滤器
Vue.filter('timefilter', function (value) {
  // 处理时间
  return dayjs().from(dayjs(value))
})
