// 权限接口封装
import request from '@/utils/request'
export const getRightList = type => request({
  method: 'get',
  url: `/rights/${type}`
}).then(res => {
  console.log(res.data)
  return res.data
})
