import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
// import state from '@/store'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userInfo:{}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  setUserInfo: (state, data) => {
    state.userInfo = data
  }
}

const actions = {
  // 登陆
  login({ commit }, params) {
    const { user, password } = params
    return new Promise((resolve, reject) => {
      login({ user: user.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken('userInfo', JSON.stringify(data))
        setToken('token', data.token)
        commit('setUserInfo', data);
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  setUser({ commit }, data){
    commit('setUserInfo', data);
  },
  // 退出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken(); // must remove  token  first
      removeToken('userInfo');
      resetRouter();
      commit('RESET_STATE');
      resolve();
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

