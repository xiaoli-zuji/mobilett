// 导入自己封装好的axios
import myhttp from '../utils/myhttp.js'
// 封装登录的请求
export function apiLogin ({ mobile, code }) {
  return myhttp({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile: mobile,
      code: code
    }
  })
}

// 关注用户
export function apiFollow (autid) {
  return myhttp({
    url: '/app/v1_0/user/followings',
    method: 'POST',
    data: {
      target: autid
    }
  })
}

// 取消用户关注
export function apiUnFollow (autid) {
  return myhttp({
    url: `/app/v1_0/user/followings/${autid}`,
    method: 'DELETE'
  })
}

// 封装方法: 获取用户信息
export function apiGetUserInfo () {
  return myhttp({
    url: '/app/v1_0/user'
  })
}

// 封装方法： 得到用户的头像 & 昵称 & 介绍
export function apiGetInfoOne () {
  return myhttp({
    url: '/app/v1_0/user'
  })
}

// 封装方法： 得到用户的性别 & 生日
export function apiGetInfoTwo () {
  return myhttp({
    url: '/app/v1_0/user/profile'
  })
}

// 封装方法:  保存用户信息
export function apiUpdateInfo ({ name, gender, birthday, intro }) {
  return myhttp({
    url: '/app/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name: name,
      gender: gender,
      birthday: birthday,
      intro: intro
    }
  })
}

// 封装方法:修修改用户的头像
export function apiUpdateImg (photo) {
  // 默认情况下 axios 与 ajax 一样，只能发送字符到服务器
  // 而现在 phto 并不是字符，而是一个图片对象，所以将来 axios 在发送时，不能解析图片，所以将 photo 设置为空
  // 问题： axios 不直接发送图片
  // 在 xhr2 中有一个新的对象，可以用来帮助 xhr 发送图片到服务器
  const fd = new FormData()
  // 将图片添加到fd中
  fd.append('photo', photo)
  return myhttp({
    url: '/app/v1_0/user/photo',
    method: 'PATCH',
    data: fd
  })
}
