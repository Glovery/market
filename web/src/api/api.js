import axios from 'axios'
axios.defaults.withCredentials = true

//用户登录
export const login = params => {
  return axios.post(`/user/login`, params)
}
// 用户注册
export const resigter = params => {
  return axios.post(`/user/resigter`, params)
}
// 修改用户信息
export const update = params => {
  return axios.post(`user/update`, params)
}
//查询用户列表
export const userList = (param) => {
  return axios.post(`user/list`, param)
}
//查询用户
export const queryUser = param => {
  return axios.post(`user/info`, param)
}
//删除用户
export const deleteUser = param => {
  return axios.post(`user/delete/${param}`)
}