// 封装所有与评论相关的请求
import myhttp from '../utils/myhttp'

// 封装方法:获取文章评论
export function apiGetArtCom ({ artid, offset, limit }) {
  return myhttp({
    url: '/app/v1_0/comments',
    method: 'GET',
    params: {
      type: 'a',
      source: artid,
      offset: offset,
      limit: limit
    }
  })
}

// 封装方法:添加评论
export function apiAddCom ({ artid, content }) {
  return myhttp({
    url: '/app/v1_0/comments',
    method: 'POST',
    data: {
      target: artid,
      content: content
    }
  })
}

// 封装方法: 获取评论回复
export function apiGetCommentReply ({ commentId, offset, limit }) {
  return myhttp({
    url: '/app/v1_0/comments',
    method: 'GET',
    params: {
      type: 'c',
      source: commentId,
      offset: offset,
      limit: limit
    }
  })
}

// 添加评论回复
export function apiAddCommentReply ({ commentId, content, artid }) {
  return myhttp({
    url: '/app/v1_0/comments',
    method: 'POST',
    data: {
      target: commentId,
      content: content,
      art_id: artid
    }
  })
}
