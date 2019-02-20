<template>
<div>
  <a-menu mode="inline" :defaultSelectedKeys="['index']" theme="dark">
    <a-menu-item key="index">
      <a-icon type="pie-chart" />
      <span>首页</span>
    </a-menu-item>
    <a-menu-item key="fund">
      <a-icon type="appstore" />

      <span>
        <router-link to="/fund">资金管理 </router-link>
      </span>

    </a-menu-item>
    <a-sub-menu key="system">
      <span slot="title">
        <a-icon type="setting" /><span>系统设置</span></span>
      <a-menu-item key="bank">
        <router-link to="/system/fundbank">银行卡管理</router-link>
      </a-menu-item>
      <a-menu-item key="sort">
        <router-link to="/system/fundsort">资金类别管理</router-link>
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</div>
</template>
<script>
export default {
  name: 'NavMenu',
  data() {
    return {}
  },
  methods: {

  }
}
</script>
<style scoped>
.ant-menu-item>a {
  display: inline-block;
  widows: 80%;
}
</style>
