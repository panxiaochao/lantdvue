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
      title: '首页'
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
      title: '资金管理'
    }
  }]
}, {
  path: '/system',
  component: Layout,
  redirect: '/system/fundSortLayout',
  name: 'System',
  meta: {
    title: '系统管理'
  },
  children: [{
    path: 'fundSortLayout',
    name: 'FundSortLayout',
    component: () =>
      import('../views/system/sort/FundSortLayout'),
    meta: {
      title: '资金类别管理'
    }
  }, {
    path: 'fundbank',
    name: 'FundBank',
    component: () =>
      import('../views/system/bank/FundBankLayout'),
    meta: {
      title: '银行卡管理'
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