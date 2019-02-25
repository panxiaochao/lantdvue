const fundsort = {
  state: {
    fundSortList: []
  },
  mutations: {
    // 同步数据
    Sync_Fund_Sort_Data: (state, data) => {
      state.fundSortList = data
    }
  },
  actions: {
    syncFundSortData({
      commit
    }, data) {
      commit('Sync_Fund_Sort_Data', data)
    }
  }
}

export default fundsort