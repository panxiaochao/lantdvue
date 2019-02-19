import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.use(Antd)
Vue.config.productionTip = false

// 在vue-cli3.X中template需要改成render: h => h(App)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})