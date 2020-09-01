// 封装其他的接口
// 导入axios
import myhttp from '../utils/myhttp.js'

// 封装联想区域
export function apiThink (key) {
  return myhttp({
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: {
      q: key
    }
  })
}

// 搜索结果
export function apiResult ({ page, perpage, q }) {
  return myhttp({
    url: '/app/v1_0/search',
    method: 'GET',
    params: {
      page: page,
      per_page: perpage,
      q: q
    }
  })
}
