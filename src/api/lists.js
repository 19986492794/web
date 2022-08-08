import request from '@/utils/request'

// 查询档案列表
export function getFileNum(data) {
  return request({ url: '/num/query', method: 'get', params: data })
}
// 新增档案列表
export function addFileNum(data) {
  return request({ url: '/num/add', method: 'post', data })
}
// 编辑档案列表
export function editFileNum(data) {
  return request({ url: '/num/update', method: 'post', data })
}
// 删除档案列表
export function delFileNum(data) {
  return request({ url: '/num/delete', method: 'post', data })
}

// 查询学员列表
export function getUser(data) {
  return request({ url: '/user/query', method: 'get', params: data })
}
// 新增学员列表
export function addUser(data) {
  return request({ url: '/user/add', method: 'post', data })
}
// 编辑学员列表
export function editUser(data) {
  return request({ url: '/user/update', method: 'post', data })
}
// 删除学员列表
export function delUser(data) {
  return request({ url: '/user/delete', method: 'post', data })
}
