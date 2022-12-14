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
//   token: getToken() // ??????token???????????????,?????????vuex????????????????????????????????????
// }
// const mutations = {
//   // ??????????????????state???????????????????????????
//   setToken(state, token) {
//     state.token = token // ??????????????????vuex
//     // ???????????????
//     setToken()
//   },
//   removeToken(state) {
//     state.token = null // ???vuex???????????????
//     removeToken()
//   }
// }

const state = {
  token: getToken(),
  userInfo: {}// ???????????????????????????
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
    // ??????????????????
    // state.userInfo = result // ??????????????????
    state.userInfo = { ...userInfo } // ?????????
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}

const actions = {
  async login(context, data) {
    // ??????api??????
    const result = await login(data)// ??????token
    // ?????????true ??????????????????
    context.commit('setToken', result)// ??????token
  },
  async getUserInfo(context) {
    const result = await getUserInfo() // ???????????????
    context.commit('setUserInfo', result) // ?????????mutations
    // return result // ?????????return??????????????????????????????
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
