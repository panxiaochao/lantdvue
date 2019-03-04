import Vue from 'vue'
import Vuex from 'vuex'
import fundsort from './modules/system/fundsort'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    fundsort
  },
  getters
})