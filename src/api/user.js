import request from '@/utils/request'
/*
 * @name 登录接口
 */
export function login(data) {
  // 返回一个promise对象
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

/*
获取用户资料
*/
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
