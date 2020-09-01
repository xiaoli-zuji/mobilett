// 导入封装好的axios
import myhttp from '../utils/myhttp.js'

// 封装获取频道列表的请求
export function apiChannel () {
  return myhttp({
    url: '/app/v1_0/user/channels'
  })
}

// 封装获取全部频道的请求
export function apiAllChannel () {
  return myhttp({
    url: '/app/v1_0/channels'
  })
}

// 修改频道列表
export function apiUpdaChannel (channels) {
  return myhttp({
    url: '/app/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels: channels
    }
  })
}
