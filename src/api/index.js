// 公共的接口封装
// 不建议直接在业务中去直接请求具体的请求路径
// 把每个请求都封装一下
// 1:接口改变,直接找到封装位置修改即可,
// 2:可以重用
// 3:方便维护
import request from '@/utils/request'

export const login = (data) => request({
  method: 'POST',
  url: '/login',
  data: {
    username: data.username,
    password: data.password
  }
}).then(res => {
  // console.log(res.data)
  return res.data
})
