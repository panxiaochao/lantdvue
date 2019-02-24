import Vue from 'vue'
import Router from 'vue-router'

/* views */
import Layout from '../views/Layout'

Vue.use(Router)

const routesMap = [{
  path: '/',
  component: Layout,
  name: 'Layout'
}, {
  path: '/fund',
  component: Layout,
  redirect: '/fund/fundlayout',
  name: 'Fund',
  meta: {
    title: 'Fund'
  },
  children: [{
    path: 'fundlayout',
    name: 'FundLayout',
    component: () =>
      import('../views/fund/FundLayout'),
    meta: {
      title: 'FundLayout'
    }
  }]
}, {
  path: '/system',
  component: Layout,
  redirect: '/system/fundSortLayout',
  name: 'System',
  meta: {
    title: 'System'
  },
  children: [{
    path: 'fundSortLayout',
    name: 'FundSortLayout',
    component: () =>
      import('../views/system/FundSortLayout'),
    meta: {
      title: 'FundSortLayout'
    }
  }, {
    path: 'fundbank',
    name: 'FundBank',
    component: () =>
      import('../views/system/FundBank'),
    meta: {
      title: 'FundBank'
    }
  }]
}];

export default new Router({
  routes: routesMap
})