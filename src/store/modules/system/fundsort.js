import {
  add,
  getListSortTable
} from '@/api/fundsort'

import {
  message
} from 'ant-design-vue'

const fundsort = {
  state: {
    tabledata: [],
    treeNode: {},
    reloadnav: false
  },
  mutations: {
    LOADTABLE: (state, data) => {
      state.tabledata = data
    },
    SET_TREENODE: (state, node) => {
      state.treeNode = node
    },
    SET_RELOADNAV: (state, flag) => {
      state.reloadnav = flag
    }
  },
  actions: {
    // fundsort
    loadtable({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        getListSortTable(params)
          .then(data => {
            //  console.log(data)
            var arr = JSON.parse(data)
            //this.$store.dispatch('syncFundSortId', selectedKeys[0])
            commit('LOADTABLE', arr)
            resolve()
          }).catch(error => {
            //message.error(error.message)
          })
      })
    },
    emptytable({
      commit
    }) {
      commit('LOADTABLE', [])
    },
    // SortNav
    setTreeNode({
      commit
    }, node) {
      commit('SET_TREENODE', node)
    },
    reloadnav({
      commit
    }, flag) {
      commit('SET_RELOADNAV', flag)
    }

  }
}

export default fundsort