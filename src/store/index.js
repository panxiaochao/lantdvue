import Vue from 'vue'
import Vuex from 'vuex'
import fundsort from './modules/fundsort'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    fundsort
  }
})