import Vue from 'vue'
import Router from 'vue-router'

/* views */
import Layout from '../views/Layout'

Vue.use(Router)

const routesMap = [{
  path: '/',
  component: Layout,
  name: 'Layout',
  redirect: '/index',
  meta: {
    title: 'index'
  },
  children: [{
    path: 'index',
    component: () =>
      import('../views/index/IndexLayout'),
    meta: {
      title: 'index'
    }
  }]
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
      import('../views/system/sort/FundSortLayout'),
    meta: {
      title: 'FundSortLayout'
    }
  }, {
    path: 'fundbank',
    name: 'FundBank',
    component: () =>
      import('../views/system/bank/FundBankLayout'),
    meta: {
      title: 'FundBank'
    }
  }]
}];

var router = new Router({
  routes: routesMap
})

router.beforeEach((to, from, next) => {
  //console.log(to)
  if (to.meta.title) {
    document.title = to.meta.title; //在路由里面写入的meta里面的title字段
  }
  next()
})

export default router