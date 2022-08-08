// import { login, logout, getInfo } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

// const getDefaultState = () => {
//   return {
//     token: getToken(),
//     name: '',
//     avatar: ''
//   }
// }

// const state = getDefaultState()

// const mutations = {
//   RESET_STATE: (state) => {
//     Object.assign(state, getDefaultState())
//   },
//   SET_TOKEN: (state, token) => {
//     state.token = token
//   },
//   SET_NAME: (state, name) => {
//     state.name = name
//   },
//   SET_AVATAR: (state, avatar) => {
//     state.avatar = avatar
//   }
// }

// const actions = {
//   // user login
//   login({ commit }, userInfo) {
//     const { username, password } = userInfo
//     return new Promise((resolve, reject) => {
//       login({ username: username.trim(), password: password }).then(response => {
//         const { data } = response
//         commit('SET_TOKEN', data.token)
//         setToken(data.token)
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // get user info
//   getInfo({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       getInfo(state.token).then(response => {
//         const { data } = response

//         if (!data) {
//           return reject('Verification failed, please Login again.')
//         }

//         const { name, avatar } = data

//         commit('SET_NAME', name)
//         commit('SET_AVATAR', avatar)
//         resolve(data)
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // user logout
//   logout({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       logout(state.token).then(() => {
//         removeToken() // must remove  token  first
//         resetRouter()
//         commit('RESET_STATE')
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // remove token
//   resetToken({ commit }) {
//     return new Promise(resolve => {
//       removeToken() // must remove  token  first
//       commit('RESET_STATE')
//       resolve()
//     })
//   }
// }

import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
// eslint-disable-next-line no-unused-vars
// const state = {
//   token: getToken() // 设置token为共享状态,初始化vuex的时候，就先从缓存中读取
// }
// const mutations = {
//   // 第一个参数是state，第二个参数是载荷
//   setToken(state, token) {
//     state.token = token // 将数据设置给vuex
//     // 同步给缓存
//     setToken()
//   },
//   removeToken(state) {
//     state.token = null // 将vuex的数据置空
//     removeToken()
//   }
// }

const state = {
  token: getToken(),
  userInfo: {}// 这里定义一个空对象
}

const mutations = {
  setToken(state, token) {
    state.token = token
    setToken()
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, userInfo) {
    // 更新一个对象
    // state.userInfo = result // 这样是响应式
    state.userInfo = { ...userInfo } // 浅拷贝
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}

const actions = {
  async login(context, data) {
    // 调用api接口
    const result = await login(data)// 拿到token
    // 如果为true 表示登陆成功
    context.commit('setToken', result)// 处理token
  },
  async getUserInfo(context) {
    const result = await getUserInfo() // 获取返回值
    context.commit('setUserInfo', result) // 提交到mutations
    // return result // 这里的return是为后面的权限做准备
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
