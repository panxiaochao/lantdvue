//custom
import 'ant-design-vue/dist/antd.css'
import 'normalize.css/normalize.css'
import "./styles/style.scss"
import 'nprogress/nprogress.css'
// 自定义样式永远放最后
import "./styles/custom/custom.scss"

//
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'

// dayjs
import dayjs from 'dayjs'

// Progress 进度条
import NProgress from 'nprogress'

NProgress.configure({
  ease: 'ease',
  speed: 500
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
});

router.afterEach(transition => {
  NProgress.done();
});


Vue.use(Antd)
Vue.config.productionTip = false
//
Vue.prototype.$dayjs = dayjs

// 在vue-cli3.X中template需要改成render: h => h(App)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})