const fundsort = {
  state: {
    data: []
  },
  mutations: {
    // 同步数据
    Sync_Fund_Sort_Data: (state, data) => {
      state.data = data
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