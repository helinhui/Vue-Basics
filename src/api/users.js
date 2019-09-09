import request from '@/utils/request'

// 用户接口封装
export const userlist = ({ pagenum = 1, pagesize = 5, query = '' }) => {
  return request({
    method: 'GET',
    url: '/users',
    params: {
      pagenum,
      pagesize,
      query // query用于模糊查询用户
    }
  }).then(res => {
    // console.log(res.data)
    return res.data
  })
}
// 添加用户
export const adduser = ({ username, password, email, mobile }) => request({
  method: 'POST',
  url: 'users',
  data: {
    username,
    password,
    email,
    mobile
  }
}).then(res => {
  console.log(res.data)
  return res.data
})

// 修改用户状态
export const changeState = (id, state) => request({
  method: 'put',
  url: `users/${id}/state/${state}`
}).then(res => res.data)

// 根据id删除用户
export const deleteId = id => request({
  method: 'DELETE',
  url: `users/${id}`
}).then(res => res.data)

// 根据id查询用户信息
export const getId = id => request({
  method: 'get',
  url: `users/${id}`
}).then(res => res.data)

// 根据id编辑用户信息
export const updateId = (id, data) => request({
  method: 'put',
  url: `users/${id}`,
  data: { // put请求和post一样都用data
    email: data.email,
    mobile: data.mobile
  }
}).then(res => res.data)

// 分配用户角色
export const updaterole = (UserId, roleId) => request({
  method: 'put',
  url: `users/${UserId}/role`,
  data: { // put请求和post一样都用data
    rid: roleId
  }
}).then(res => res.data)
