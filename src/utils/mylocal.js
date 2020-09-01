// 封装所有对localStrage 的操作

// 储存
function localSet (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}
// 获取
function localGet (key, value) {
  return JSON.parse(window.localStorage.getItem(key))
}
// 删除
function localDev (key, value) {
  window.localStorage.removeItem(key)
}

// 导出
export {
  localSet,
  localGet,
  localDev
}
