// 角色接口封装
// 获取角色列表
import request from '@/utils/request'

export const getrolelist = () => {
  return request({
    method: 'GET',
    url: '/roles'
  }).then(res => {
    // console.log(res.data)
    return res.data
  })
}
