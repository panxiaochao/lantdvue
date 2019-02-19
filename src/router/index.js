import Vue from 'vue'
import Router from 'vue-router'

/* views */
import Layout from '../views/Layout'

Vue.use(Router)

const routesMap = [{
  path: '/',
  component: Layout,
  name: 'Layout'
}];

export default new Router({
  routes: routesMap
})