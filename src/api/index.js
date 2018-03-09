import http from './public'
let url = 'http://shaodai.3dsort.com/app/staff'
// 登陆
export const userLogin = (params) => {
  return http.fetchPost(url+'/login', params)
}
// 用户信息
export const usermsg = (params) => {
  return http.fetchPost(url+'/center', params)
}
// 订单
export const orders = (params) => {
  return http.fetchPost(url+'/task/verified', params)
}
// 订单详情
export const orderdetail = (params) => {
  return http.fetchPost(url+'/task/detail', params)
}
// 异常订单
export const abnomaler = (params) => {
  return http.fetchPost(url+'/report/list', params)
}
// 异常订单详情
export const abnomaldetail = (params) => {
  return http.fetchPost(url+'/report/detail', params)
}
// 验收订单
export const accepted = (params) => {
  return http.fetchPost(url+'/task/accepted', params)
}
// 删除异常订单
export const deletes = (params) => {
  return http.fetchPost(url+'/report/delete', params)
}
// 消息中心
export const messages = (params) => {
  return http.fetchPost(url+'/msg/list', params)
}
// 消息中心详情
export const messagedetail = (params) => {
  return http.fetchPost(url+'/msg/detail', params)
}
// 消息删除
export const msgdelet = (params) => {
  return http.fetchPost(url+'/msg/delete', params)
}
// 未读消息
export const newscheck = (params) => {
  return http.fetchPost(url+'/msg/check', params)
}
// 设消息已读
export const taskread = (params) => {
  return http.fetchPost(url+'/msg/read', params)
}
// 清空消息列表
export const msgclear = (params) => {
  return http.fetchPost(url+'/msg/clear', params)
}
// 订单审核/验收
export const taskscan = (params) => {
  return http.fetchPost(url+'/task/scan', params)
}
// 查询可验收任务
export const tasksearch = (params) => {
  return http.fetchPost(url+'/task/search', params)
}