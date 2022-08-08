import {
  getFileNum,
  addFileNum,
  editFileNum,
  delFileNum,

  getUser,
  addUser,
  editUser,
  delUser
} from '@/api/lists';

export default {
  namespaced: true,
  state:{

  },
  mutations:{

  },
  actions:{
    // 档案-查询列表
    getFileNumf({ commit }, data) {
      return new Promise((resolve, reject) => {
        getFileNum(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 档案-新增档案
    addFileNumf({ commit }, data) {
      return new Promise((resolve, reject) => {
        addFileNum(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 档案-编辑档案
    editFileNumf({ commit }, data) {
      return new Promise((resolve, reject) => {
        editFileNum(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 档案-删除档案
    delFileNumf({ commit }, data){
      return new Promise((resolve, reject) => {
        delFileNum(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 查询学员列表
    getUsers({ commit }, data){
      return new Promise((resolve, reject) => {
        getUser(data).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 新增学员列表
    addUsers({ commit }, data){
      return new Promise((resolve, reject) => {
        addUser(data).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 编辑学员列表
    editUsers({ commit }, data){
      return new Promise((resolve, reject) => {
        editUser(data).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除学员列表
    delUsers({ commit }, data){
      return new Promise((resolve, reject) => {
        delUser(data).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
