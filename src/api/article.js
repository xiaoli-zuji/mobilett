// 导入封装好的axios
import myhttp from '../utils/myhttp.js'

// 封装获取文章的请求
export function apiArticle (id) {
  return myhttp({
    url: '/app/v1_1/articles',
    method: 'GET',
    params: {
      channel_id: id,
      timestamp: Date.now(),
      with_top: 0
    }
  })
}

// 封装方法:不感兴趣
export function apiDisLike (id) {
  return myhttp({
    url: '/app/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: id
    }
  })
}

// 封装方法:举报文章
export function apiReport ({ artid, type }) {
  return myhttp({
    url: '/app/v1_0/article/reports',
    method: 'POST',
    data: {
      target: artid,
      type: type,
      remark: ''
    }
  })
}

// 封装一个拉黑作者的方法
export function apiBlack (autid) {
  return myhttp({
    url: '/app/v1_0/user/blacklists',
    method: 'POST',
    data: {
      target: autid
    }
  })
}

// 获取文章详情
export function apiGetDetail (artid) {
  return myhttp({
    url: `/app/v1_0/articles/${artid}`,
    method: 'GET'
  })
}

// 点赞
export function apiZan (artid) {
  return myhttp({
    url: '/app/v1_0/article/likings',
    method: 'POST',
    data: {
      target: artid
    }
  })
}

// 取消点赞
export function apiUnZan (artid) {
  return myhttp({
    url: `/app/v1_0/article/likings/${artid}`,
    method: 'DELETE'
  })
}

// 对文章不喜欢
export function apiDislike (artid) {
  return myhttp({
    url: '/app/v1_0/article/likings',
    method: 'POST',
    data: {
      target: artid
    }
  })
}

// 取消对文章不喜欢
export function apiUnDislike (artid) {
  return myhttp({
    url: `/app/v1_0/article/likings/${artid}`,
    method: 'DELETE'
  })
}
